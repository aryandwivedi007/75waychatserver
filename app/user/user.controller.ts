import expressAsyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import * as userService from './user.service';
import { createResponse } from '../common/helper/response.helper';

export const getUserById = expressAsyncHandler(async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);
  const result = await userService.getUserById(req.params.userId);
  res.send(createResponse(result, 'User data fetched successfully'));
});
export const createUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);
  res.send(createResponse(result, 'User created sucssefully'));
});

export const updateUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const result = await userService.updateUser(req.params.userId, req.body);
  res.send(createResponse(result, 'User updated successfully'));
});

export const editUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const result = await userService.editUser(req.params.userId, req.body);
  res.send(createResponse(result, 'User edited successfully'));
});

export const deleteUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const result = await userService.deleteUser(req.params.userId);
  res.send(createResponse(result, 'User deleted successfully'));
});

export const getAllGroupOfAUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const result = await userService.getAllGroupOfAUser(req.params.userId);
  res.send(createResponse(result, 'User groups are fetched successfully'));
});

export const findUserByEmail = expressAsyncHandler(async (req: Request, res: Response) => {
  const result = await userService.findUserByEmail(req.params.email);
  res.send(createResponse(result, 'User asscociated with email is fetched successfully'));
});
