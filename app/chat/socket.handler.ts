import { Server, Socket } from 'socket.io';
import axios from 'axios';
import { IChat } from './chat.dto';
import { saveChatToDatabase } from './chat.service';

export const initSocketEvents = (io: Server) => {
  let arr = new Array<IChat>();
  io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    // Join a room
    socket.on('joinRoom', async (data) => {
      const { roomId, userId } = data;

      try {
        console.log(`🔍 Fetching room data for roomId: ${roomId}`);
        const response = await axios.get(`http://localhost:5000/api/rooms/${data.roomId}/members`);
        const roomData = response.data;

        if (roomData && roomData.data) {
          const userInRoom = roomData.data.some((user) => user._id === userId);

          if (userInRoom) {
            socket.join(roomId);
            console.log(`User ${userId} joined room: ${roomId}`);
          } else {
            console.log(`User ${userId} is not in room ${roomId}`);
            socket.emit('error', { message: 'User is not part of this room' });
          }
        } else {
          console.log('No room data found');
          socket.emit('error', { message: 'Room data is not available' });
        }
      } catch (error) {
        console.error(`Error fetching room data for roomId ${roomId}:`, error);
        socket.emit('error', { message: 'Error fetching room data' });
      }
    });

    // Handle messages
    socket.on('sendMessage', async (data) => {
      const { roomId, userId, message } = data;

      const response = await saveChatToDatabase(data);
      if (response == true) {
        console.log('Chat data is persisted to database');
      } else {
        console.log('Some internal server error occured');
      }

      try {
        // Fetch room data from the backend
        const response = await axios.get(`http://localhost:5000/api/rooms/${roomId}/members`);
        const roomData = response.data;
        //console.log(roomData);
        // if (roomData && roomData.users && roomData.users.includes(userId)) {
        // If the room exists and the user is in the room, send the message
        console.log(`Message from ${userId} to room ${roomId}: "${message}"`);
        io.to(roomId).emit('receiveMessage', { userId, roomId });
        // }
        //else {
        // If the room does not exist or user is not in the room
        //console.log(`User ${userId} is not in room ${roomId}`);

        //}
      } catch (error) {
        socket.emit('error', { message: 'User is not part of this room' });
        console.error(`Error fetching room data for roomId ${roomId}:`, error);
        socket.emit('error', { message: 'Error fetching room data' });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
