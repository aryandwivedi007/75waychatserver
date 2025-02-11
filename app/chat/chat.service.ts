// chat.service.ts
import { IChat } from './chat.dto';
import { ChatRepository } from './chat.repository';
import { Chat } from './chat.schema';

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
    throw error;
    return false;
  }
};
