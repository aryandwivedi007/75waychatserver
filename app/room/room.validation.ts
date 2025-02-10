import { body } from 'express-validator';

export const createRoom = [
  body('name')
    .notEmpty()
    .withMessage('Room name is a required field')
    .isString()
    .withMessage('Room name must be a string'),
  body('isPrivate')
    .notEmpty()
    .withMessage('Room privacy status is a required field')
    .isBoolean()
    .withMessage('Is-Private status must be a boolean value'),
  body('createdById')
    .notEmpty()
    .withMessage('Admin id is a required field')
    .isString()
    .withMessage('Admin id should be a string'),
  body('members')
    .notEmpty()
    .withMessage('Members array cannot be empty')
    .isArray()
    .withMessage('Members should be an array')
    .custom((value) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (typeof item !== 'string') {
            throw new Error('Each member ID should be a string');
          }
        });
      }
      return true;
    }),
];

export const invitationPayload = [
  body('roomId')
    .notEmpty()
    .withMessage('Room Id can not be empty')
    .isString()
    .withMessage('Room id must be string'),
  body('userId')
    .notEmpty()
    .withMessage('User id can not be empty')
    .isString()
    .withMessage('User id must be string'),
  body('toBeInvitedId')
    .notEmpty()
    .withMessage('To be invited user can not be empty')
    .isString()
    .withMessage('Required value of inviting user should be a string'),
];
