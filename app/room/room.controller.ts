import expressAsyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import * as roomService from './room.service';
import { createResponse } from '../common/helper/response.helper';
import { ParamsDictionary } from 'express-serve-static-core';

export const createRoom = expressAsyncHandler(async (req: Request, res: Response) => {
  const result = await roomService.createRoom(req.body);
  res.send(createResponse(result, 'User created sucssefully'));
});

export const getRoomById = expressAsyncHandler(async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const result = await roomService.getRoomById(roomId);
  res.send(createResponse(result, 'Room data fetched successfully'));
});

export const updateRoomMembers = expressAsyncHandler(async (req: Request, res: Response) => {
  const { roomId, action } = req.params;
  const members: string[] = req.body.members;

  if (!['add', 'remove'].includes(action)) {
    res.send(createResponse(null, 'Action can only contain add or remove value'));
  }
  console.log('hello from update');
  const typedAction = action as 'add' | 'remove';
  const result = await roomService.updateRoomMembers(roomId, members, typedAction);
  res.send(createResponse(result, 'Room members updated successfully'));
});

export const getAllMembersOfAGroupForUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const result = await roomService.getAllMembersOfAGroupForUser(req.params.roomId);
    res.send(createResponse(result, 'Group members are fetched successfully'));
  }
);

export const sendInviteLink = expressAsyncHandler(async (req: Request, res: Response) => {
  const result = await roomService.sendGroupInvitationLink(req.body);
  res.send(createResponse(result, 'Invitation is handled successfully'));
});

export const handleInvitationLink = expressAsyncHandler(async (req: Request, res: Response) => {
  const { token } = req.query;
  console.log(token, req.params.roomId, 'hhytyjutyuyuiuy');
  const result = await roomService.handleRoomInviteRequest(req.params.roomId, token as string);
  res.send(createResponse(result, 'Invitation is handled successfully'));
});
