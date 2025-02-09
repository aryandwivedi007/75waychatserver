import { IUser } from '../user/user.dto';
import { User } from '../user/user.schema';

export interface IRoom {
  name: string;
  isPrivate: boolean;
  createdBy: IUser;
  members: IUser[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateRoomRequest {
  name: string;
  isPrivate: boolean;
  createdBy: string; // Expecting the ID of the user (UUID)
  members: string[]; // Array of user IDs (UUIDs)
  createdAt?: Date;
  updatedAt?: Date;
}
