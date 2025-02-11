import Router from 'express';
import * as userController from './user.controller';
import * as userValidator from './user.validation';
import passport from 'passport';
import { catchError } from '../common/middleware/catch-error.middleware';

const userRoutes = Router();

userRoutes
  .get(
    '/:userId',
    catchError,
    passport.authenticate('jwt', { session: false }),
    userController.getUserById
  )
  .get('/:email/find', userController.findUserByEmail)
  .post('/', catchError, userController.findUserByEmail)
  .put(
    '/:userId',
    passport.authenticate('jwt', { session: false }),
    userValidator.updateUser,
    catchError,
    userController.updateUser
  )
  .patch(
    '/:userId',
    passport.authenticate('jwt', { session: false }),
    userValidator.editUser,
    catchError,
    userController.editUser
  )
  .delete(
    '/:userId',
    passport.authenticate('jwt', { session: false }),
    catchError,
    userController.deleteUser
  )
  .get(
    '/:userId/getAllRooms',
    passport.authenticate('jwt', { session: false }),
    catchError,
    userController.getAllGroupOfAUser
  );

export default userRoutes;
