import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IRoom } from './room.dto';
import { User } from '../user/user.schema';
import { IUser } from '../user/user.dto';
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

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt!: Date;
}
