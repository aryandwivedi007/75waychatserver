import { AppDataSource } from '../db/db.config';
import { User } from './user.schema';

export const UserRepository = AppDataSource.getRepository(User);
