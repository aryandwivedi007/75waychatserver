// chat.service.ts
import { createQueryBuilder } from 'typeorm';
import { IChat } from './chat.dto';
import { ChatRepository } from './chat.repository';
import { Chat } from './chat.schema';
import { classToPlain, plainToClass } from 'class-transformer';

export const saveChatToDatabase = async (chatData: IChat[]) => {
  const chats = chatData.map((data) => {
    const chat = new Chat();
    chat.message = data.message;
    chat.userId = data.userId;
    chat.roomId = data.roomId;
    return chat;
  });

  try {
    const result = await ChatRepository.save(chats);
    console.log('Chats saved successfully:', result);
    return true;
  } catch (error) {
    console.error('Error saving chats:', error);
    return false;
  }
};

export const getChatsByRoomId = async (roomId: string) => {
  const chats = await ChatRepository.createQueryBuilder('chat')
    .where('chat.roomId = :roomId', { roomId })
    .getMany(); // Retrieve the data
  console.log(chats);
  const plainChatData = classToPlain(chats);
  return plainChatData;
};
