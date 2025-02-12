import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IChat } from './chat.dto';
import { IRoom } from '../room/room.dto';
import { IUser } from '../user/user.dto';
import { User } from '../user/user.schema';
import { Room } from '../room/room.schema';

@Entity()
export class Chat implements IChat {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @ManyToOne(() => Room, (room) => room.messages)
  room: Room;

  @Column()
  message: string;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createdAt!: Date;
  chat: Promise<Room>;
}
