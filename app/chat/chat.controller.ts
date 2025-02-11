import expressAsyncHandler from 'express-async-handler';
import * as chatService from './chat.service';
import { Request, Response } from 'express';
import { createResponse } from '../common/helper/response.helper';

export const getChatsByRoomId = expressAsyncHandler(async (req: Request, res: Response) => {
  const result = await chatService.getChatsByRoomId(req.params.roomId);
  res.send(createResponse(result, 'Chats fetched successfully'));
});
