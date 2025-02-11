import { AppDataSource } from '../db/db.config';
import { Chat } from './chat.schema';

export const ChatRepository = AppDataSource.getRepository(Chat);
