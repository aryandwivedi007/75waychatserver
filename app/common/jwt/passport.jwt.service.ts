import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { type Request } from 'express';
import createHttpError from 'http-errors';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import { IUser } from '../../user/user.dto';
import { findUserByEmail } from '../../user/user.service';
import { User } from '../../user/user.schema';
import { UserRepository } from '../../user/user.repository';

const isValidPassword = async (value: string, password: string) => {
  const compare = bcrypt.compare(value, password);
  return compare;
};

export const initPassport = (): void => {
  passport.use(
    new Strategy(
      {
        secretOrKey: process.env.JWT_SECRET || 'abcdefghijkla12',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token: { user: Request['user'] }, done) => {
        console.log('Decoded token:', token);
        try {
          done(null, token);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  // user login
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await findUserByEmail(email);
          if (user == null) {
            done(createHttpError(401, 'User not found!'), false);
            return;
          }

          if (!user.active) {
            done(createHttpError(401, 'User is inactive'), false);
            return;
          }

          // if (user.blocked) {
          //   done(createError(401, "User is blocked, Contact to admin"), false);
          //   return;
          // }

          const validate = await isValidPassword(password, user.password);
          if (!validate) {
            done(createHttpError(401, 'Invalid email or password'), false);
            return;
          }
          const { password: _p, ...result } = user;
          done(null, result, { message: 'Logged in Successfully' });
        } catch (error: any) {
          done(createHttpError(500, error.message));
        }
      }
    )
  );
};

export const createUserTokens = (user: Omit<IUser, 'password'>) => {
  const jwtSecret = process.env.JWT_SECRET ?? 'abcdefghijkla12';
  const token = jwt.sign(user, jwtSecret, { expiresIn: '10h' });
  return { accessToken: token, refreshToken: '' };
};

export const decodeToken = (token: string) => {
  const decode = jwt.decode(token);
  console.log(decode);
  return decode as IUser;
};
