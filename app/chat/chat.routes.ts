import { Router } from 'express';
import * as chatController from './chat.controller';
const chatRouter = Router();

chatRouter.get('/:roomId/allChats', chatController.getChatsByRoomId);

export default chatRouter;
