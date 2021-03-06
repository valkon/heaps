import {  Resolver, Arg, Int, Mutation, InputType, Field} from 'type-graphql';

import { getManager } from "typeorm";
import { Message } from '../entities/Message';
import { Chat } from '../entities/Chat';


//Define the types for  Message inputs
@InputType()
class MessageCreateInput {
  @Field(() => String)
  text: string;

  @Field(() => Int)
  chatId: number;

  @Field(() => Int)
  currentUserId: number;
}

@Resolver()
export class MessageResolver {

  @Mutation(() => Message)
  async createMessage (
    @Arg('options') options: MessageCreateInput
  ): Promise<Message> {
    const entityManager = getManager();
    const chat = await Chat.findOneOrFail(options.chatId, { relations: ['messages']});
    const message = await entityManager
                        .create(Message, { ...options, chat: chat, authorId: options.currentUserId})
                        .save();
    return message;
  }

  @Mutation(() => Message)
  async MarkAsRead (
    @Arg('id' , () => Int) id: number
  ): Promise<Message> {
    const message = await Message.findOneOrFail(id);
    message.isRead = true;
    const updatedMessage = await message.save();
    return updatedMessage;
  }

}


