import { body } from 'express-validator';

export const loginRequest = [
  body('email')
    .notEmpty()
    .withMessage('Email is a required field')
    .isString()
    .withMessage('Email should be a string value'),
  body('password')
    .notEmpty()
    .withMessage('Password is a required field')
    .isString()
    .withMessage('Password should be a string value'),
];
