// chat.service.ts
import { createQueryBuilder } from 'typeorm';
import { IChat, IChatRequest } from './chat.dto';
import { ChatRepository } from './chat.repository';
import { Chat } from './chat.schema';
import { classToPlain, plainToClass } from 'class-transformer';
import { UserRepository } from '../user/user.repository';
import { RoomRepository } from '../room/room.repository';
import { getRoomById } from '../room/room.service';

export const saveChatToDatabase = async (chatData: IChatRequest) => {
  const user = await UserRepository.findOne({ where: { _id: chatData.userId } });
  const currRoom = await RoomRepository.findOne({ where: { _id: chatData.roomId } });
  /*
  const chats = chatData.map((data) => {
    const chat = new Chat();
    chat.message = data.message;
    chat.userId = data.userId;
    chat.roomId = data.roomId;
    return chat;
  });
  */

  const chat = new Chat();
  chat.message = chatData.message;
  chat.room = currRoom;
  chat.user = user;

  try {
    const result = await ChatRepository.save(chat);
    console.log('Chats saved successfully:', result);
    return true;
  } catch (error) {
    console.error('Error saving chats:', error);
    return false;
  }
};

export const getChatsByRoom = async (roomId: string) => {
  const room = await RoomRepository.findOne({ where: { _id: roomId } });
  const chats = await ChatRepository.createQueryBuilder('chat')
    .where('chat.room = :room', { room })
    .getMany(); // Retrieve the data
  console.log(chats);
  const plainChatData = classToPlain(chats);
  return plainChatData;
};

export const getChatsByRoomId = async (roomId: string) => {
  try {
    /*
    const room =  getRoomById(roomId)
    console.log(room,"gfgfgfgfgf")
    if (!room) {
      console.error('Room not found');
      return [];
    }
      */

    // Fetch all chats for the given room using QueryBuilder
    const chats = await ChatRepository.createQueryBuilder('chat')
      .where('chat.room = :roomId', { roomId })

      .getMany(); // Retrieve the data

    console.log('jhghj', chats);

    // Convert chat data to plain objects (optional depending on your needs)
    const plainChatData = classToPlain(chats);
    return plainChatData;
  } catch (error) {
    console.error('Error fetching chats:', error);
    return [];
  }
};
