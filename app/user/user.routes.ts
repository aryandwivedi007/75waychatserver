import Router from 'express';
import * as userController from './user.controller';
import * as userValidator from './user.validation';
import { catchError } from '../common/middleware/catch-error.middleware';

const userRoutes = Router();

userRoutes.post(
  '/',
  userValidator.createUser,
  catchError,
  userController.createUser,
);

export default userRoutes;
