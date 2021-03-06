import type { NextPage } from 'next';
import { Container, Flex, Heading, Image } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { getAllItems } from '../redux/actions/items';
import { useGet_All_ItemsQuery, useMeQuery } from '../generated/graphql';
import Home from '../components/Home/Home';
import { useEffect } from 'react';
import { getInitialUser } from '../redux/actions/user';
import '@fontsource/lobster';

export interface State {
  user?;
  items?;
  chats?;
}

const IndexPage: NextPage = () => {
  const dispatch = useDispatch();

  const getItemsList = () => {
    const [{ data, fetching }] = useGet_All_ItemsQuery();
    return data && data.getAllItems;
  };

  const getMeData = () => {
    const [{ data }] = useMeQuery();
    return data && data.me;
  };

  const itemList = getItemsList();

  const meUser = getMeData();

  useEffect(() => {
    dispatch(getAllItems(itemList));
    meUser && dispatch(getInitialUser(meUser));
  });

  return (
    <Container
      maxW='375px'
      ml='0px'
      padding='0px'
      sx={{ height: '812px', width: '375px' }}>
      <Flex flexDirection='row'>
        {/* {meUser && <Heading sx={HcStyle()}>Hello, {meUser.username}!</Heading>} */}
        <Heading sx={HStyle()}>heaps</Heading>
        <Container sx={cStyle()}>
          <Image src='/code_works_heaps.png' boxSize='60px' />
        </Container>
      </Flex>
      <Home />
    </Container>
  );
};
function cStyle() {
  return {
    position: 'fixed',
    fontFamily: 'Lobster',
    fontSize: '3xl',
    color: '#5D55B4;',
  };
}
function HStyle() {
  return {
    position: 'absolute',
    marginTop: '55px',
    fontFamily: 'Lobster',
    fontSize: '20px',
    color: 'primary',
    marginLeft: '21px',
  };
}

function HcStyle() {
  return {
    position: 'fixed',
    left: '260px',
    fontSize: 'xs',
    zIndex: '1',
    color: '#5D55B4;',
    width: '375px',
    marginTop: '10px',
    backgroundColor: 'transparent',
  };
}

export default IndexPage;
