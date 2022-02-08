import { Box, Button, Container, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import { render } from 'react-dom';
import { useSelector } from 'react-redux';
import { useGetChatMessagesQuery } from '../../generated/graphql';
import { State } from '../../pages';
import { ChatInputForm } from './ChatInputForm';
import { ClaimButton } from './ClaimButton';
import { MessagesList } from './MessagesList';

interface MessagesContainerProps {
  chatId;
}

export const MessagesContainer: React.FC<MessagesContainerProps> = ({
  chatId
}) => {
 
  const [res, updateMessages] = useGetChatMessagesQuery({
    variables: {
      getChatId: chatId
    }
  });
 

  const { data, error, fetching } = res;
  const user = useSelector((state: State) => state.user);

  if (error) {
    console.log(error);
    return <h1>Error Fetching Lobby</h1>;
  }

  if (fetching) {
    return (
      <>
        <Container sx={cStyle()}>
          <Box display='flex' alignItems='center' flexDirection='row'>
            <Heading ml='9px'>Chat Loading</Heading>
          </Box>
          <MessagesList user={user} messages={[]} chatId={null}></MessagesList>
        </Container>
      </>
    );
  }

  if (data) {
    const messages = data.getChat.messages;
    chatId = data.getChat.id;
    const requester = data.getChat.users
      .filter((user) => user.id !== data.getChat.userOwnerId)
      .pop();

    return (
      <>
        <Container sx={cStyle()}>
          <Box display='flex' alignItems='center' flexDirection='row'>
            <Heading ml='9px'>{data.getChat.item.name}</Heading>
            <ClaimButton
              userOwnerId={data.getChat.userOwnerId}
              requesterId={requester.id}
              myID={user.id}
              itemID={data.getChat.item.id}></ClaimButton>
          </Box>
          <MessagesList user={user} messages={messages} chatId={chatId}></MessagesList>
        </Container>
      </>
    );
  }
};

function cStyle() {
  return {
    margin: '5px',
    padding: '0',
    display: 'flex',
    // alignItems: 'center',
    flexDirection: 'column',
    width: '95%',
  };
}
