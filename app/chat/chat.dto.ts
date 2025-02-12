import { IRoom } from '../room/room.dto';
import { IUser } from '../user/user.dto';
import { User } from '../user/user.schema';

export interface IChatRequest {
  roomId: string;
  userId: string;
  message: string;
}

export interface IChat {
  room: IRoom;
  user: IUser;
  message: string;
}
