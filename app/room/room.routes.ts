import { Router } from 'express';
import * as roomValidator from './room.validation';
import { catchError } from '../common/middleware/catch-error.middleware';
import * as roomController from './room.controller';
import passport from 'passport';
const roomRouter = Router();

roomRouter
  .post('/', roomValidator.createRoom, catchError, roomController.createRoom)
  .get('/:roomId', catchError, roomController.getRoomById)
  .patch(
    '/:roomId/invite',
    passport.authenticate('jwt', { session: false }),
    catchError,
    roomController.handleInvitationLink
  )
  .patch(
    '/:roomId/:action',
    passport.authenticate('jwt', { session: false }),
    catchError,
    roomController.updateRoomMembers
  )
  .get(
    '/:roomId/members',

    catchError,
    roomController.getAllMembersOfAGroupForUser
  )
  .post(
    '/invite',
    passport.authenticate('jwt', { session: false }),
    roomValidator.invitationPayload,
    catchError,
    roomController.sendInviteLink
  );

export default roomRouter;
