import express from 'express';
import userRoutes from './user/user.routes';
import roomRouter from './room/room.routes';
import authRouter from './common/auth/auth.routes';
import chatRouter from './chat/chat.route';

const routers = express.Router();

routers.use('/users', userRoutes);
routers.use('/rooms', roomRouter);
routers.use('/auth', authRouter);
routers.use('/chat', chatRouter);

export default routers;
