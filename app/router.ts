import express from 'express';
import userRoutes from './user/user.routes';
import roomRouter from './room/room.routes';
import authRouter from './common/auth/auth.routes';


const routers = express.Router();

routers.use('/users', userRoutes);
routers.use('/rooms', roomRouter);
routers.use('/auth', authRouter);


export default routers;
