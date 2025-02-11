import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IChat } from './chat.dto';

@Entity()
export class Chat implements IChat {
  @PrimaryGeneratedColumn('uuid')
  _id: string;
  @Column()
  roomId: string;
  @Column()
  userId: string;

  @Column()
  message: string;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createdAt!: Date;
}
