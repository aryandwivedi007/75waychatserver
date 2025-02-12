import { DataSource } from 'typeorm';
import { User } from '../user/user.schema';
import { Room } from '../room/room.schema';
import { Chat } from '../chat/chat.schema';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: '75waychatserver',
  entities: [User, Room, Chat],
  synchronize: true,
  logging: true,
});

AppDataSource.initialize()
  .then(() => console.log('Database Connected!'))
  .catch((err) => console.error('Database Connection Error:', err));
