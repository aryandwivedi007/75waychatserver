import expressAsyncHandler from 'express-async-handler';
import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import { createResponse } from '../helper/response.helper';
import { createUserTokens } from '../jwt/passport.jwt.service';

export const authenticate = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const response = passport.authenticate('login', async (err, user, info) => {
      if (err || !user) {
        res.send(createResponse(response, 'Authentication failed'));
      }

      const { accessToken } = createUserTokens(user);
      res.status(200).send({
        success: true,
        message: 'User is logged in successfully',
        user,
        accessToken,
      });
    })(req, res, next);
  }
);
