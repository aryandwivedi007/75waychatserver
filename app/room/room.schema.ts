import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IRoom } from './room.dto';
import { User } from '../user/user.schema';
import { IUser } from '../user/user.dto';
import { Chat } from '../chat/chat.schema';
@Entity('room')
export class Room implements IRoom {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  name: string;

  @Column()
  isPrivate: boolean;

  @ManyToOne(() => User, (user) => user.createdRooms)
  createdBy: User;

  @ManyToMany(() => User, (user) => user.rooms)
  @JoinTable() // Creates a junction table for Room-User relationship
  members: User[];

  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createdAt!: Date;

  @OneToMany(() => Chat, (message) => message.room)
  messages: Chat[];

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt!: Date;
}
