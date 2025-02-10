import { Router } from 'express';
import { catchError } from '../middleware/catch-error.middleware';
import * as authController from './auth.controller';
import * as authValidator from './auth.validation';
const authRouter = Router();

authRouter.post(
  '/authenticate',
  authValidator.loginRequest,
  catchError,
  authController.authenticate
);

export default authRouter;
