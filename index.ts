import express, { type Express, type Request, type Response } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import bodyParser from 'body-parser';
import { setupSwagger } from './app/common/config/swagger.config';
import { Server } from 'socket.io';
import cors from 'cors';
import { initSocketEvents } from './app/chat/socket.handler';
import routers from './app/router';
import { IUser } from './app/user/user.dto';
import passport from 'passport';
import { initPassport } from './app/common/jwt/passport.jwt.service';
dotenv.config();
const app: Express = express();
const port = process.env.PORT ?? 5000;
app.use(
  cors({
    origin: '*', // Allow all origins (disables CORS)
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  })
);

setupSwagger(app);

declare global {
  namespace Express {
    interface User extends Omit<IUser, 'password'> {}
    interface Request {
      user?: User;
    }
  }
}

const server = http.createServer(app);
const io = new Server(server, {});

initSocketEvents(io);

app.use(bodyParser.json());
app.use('/api', routers);

app.get('/', (req: Request, res: Response) => {
  res.send({ status: 'ok' });
});

initPassport();
app.use(passport.initialize());

// Start server
server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
