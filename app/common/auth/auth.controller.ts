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
      console.log(user);
      const { accessToken } = createUserTokens(user);

      // Send everything within a 'data' object
      res.status(200).send({
        data: {
          success: true,
          message: 'User is logged in successfully',
          user,
          accessToken,
        }
      });
    })(req, res, next);
  }
);


export const logout = expressAsyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  // To do: Remove session
  res.send(createResponse({}))
});


// export const authenticate = expressAsyncHandler(async (req: Request, res: Response) => {
//   console.log(req.user)
//   const tokens = createUserTokens(req.user!)
//   res.send(createResponse(tokens))
// });
