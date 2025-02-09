import { AppDataSource } from '../db/db.config';
import { Room } from './room.schema';

export const RoomRepository = AppDataSource.getRepository(Room);
