import { body } from 'express-validator';

export const createUser = [
  body('userName')
    .notEmpty()
    .withMessage('User name is required field')
    .isString()
    .withMessage('Username must be a string'),
  body('email')
    .notEmpty()
    .withMessage('Email is a required field')
    .isString()
    .withMessage('Email must be a string'),
  body('password')
    .notEmpty()
    .withMessage('Password is a required field')
    .isString()
    .withMessage('Password must be a string'),
];

export const updateUser = [
  body('userName')
    .notEmpty()
    .withMessage('User name is required field')
    .isString()
    .withMessage('Username must be a string'),
  body('email')
    .notEmpty()
    .withMessage('Email is required field')
    .isString()
    .withMessage('Email must be a string'),
  body('active').isBoolean().withMessage('active must be a boolean'),
  body('role')
    .notEmpty()
    .withMessage('Role is a required field')
    .isString()
    .withMessage('Role must be a string'),
];

export const editUser = [
  body('userName').isString().withMessage('Username must be a string'),
  body('email').isString().withMessage('Email must be a string'),
  body('active').isBoolean().withMessage('Active status must be a boolean'),
];
