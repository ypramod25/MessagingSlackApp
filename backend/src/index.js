import './processors/mailProcessor.js';

import cors from 'cors'
import express from 'express';
import {createServer} from 'http'
import { StatusCodes } from 'http-status-codes';
import {Server} from 'socket.io';

import serverAdapter from './config/bullBoardConfig.js';
import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import channelSocketHandler from './controllers/channelSocketController.js';
import messageSocketHandler from './controllers/messageSocketController.js';
import { verifyEmailController } from './controllers/userController.js';
import apiRouter from './routes/apiRouter.js';


const app = express();
const server = createServer(app); // common server where both express and socket.io will run
const io = new Server(server, {
  cors: {
    origin: '*'
  }
}); // Create a Socket.IO server instance

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  messageSocketHandler(io, socket);
  channelSocketHandler(io, socket);
});

app.use(cors()); // here we pass no origin in cors so it allows all origins
app.use('/ui', serverAdapter .getRouter());

app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded request bodies (e.g., form submissions)
app.use('/api', apiRouter);

app.get('/verify/:token', verifyEmailController);

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({ message: 'pong' });
});

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});