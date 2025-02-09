import express, { type Express, type Request, type Response } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import { setupSwagger } from './app/common/config/swagger.config';
import { Server } from 'socket.io';
import cors from 'cors';
import { initSocketEvents } from './app/chat/socket.handler';
import routers from './app/router';


const app: Express = express();
const port = process.env.PORT ?? 5000;

setupSwagger(app);

app.use(cors({
  origin: "*",  // Allow all origins (disables CORS)
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
}));

const server = http.createServer(app);
const io = new Server(server, {});

initSocketEvents(io);  // Initialize socket events with the io instance

app.use(bodyParser.json());
app.use('/api', routers);

app.get('/', (req: Request, res: Response) => {
  res.send({ status: 'ok' });
});

// Start server
server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
