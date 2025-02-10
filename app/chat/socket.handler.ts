
import { Server, Socket } from 'socket.io';
import axios from 'axios';


export const initSocketEvents = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    // Join a room
    socket.on('joinRoom', async (data) => {
      const { roomId, userId } = data;
      console.log('Data received in joinRoom:', data);

      try {
        
        console.log(`🔍 Fetching room data for roomId: ${roomId}`);
        const response = await axios.get(`http://localhost:5000/api/rooms/${data.roomId}`);
        const roomData = response.data;
        console.log(data.roomId);
        if (roomData && roomData.users && roomData.users.includes(userId)) {
         
          socket.join(roomId);
          console.log(`User ${userId} joined room: ${roomId}`);
        } else {
          console.log(`User ${userId} is not in room ${roomId}`);
          socket.emit('error', { message: 'User is not part of this room' });
        }
      } catch (error) {
        console.error(`Error fetching room data for roomId ${roomId}:`, error);
        socket.emit('error', { message: 'Error fetching room data' });
      }
    });

    // Handle messages
    socket.on('sendMessage', async (data) => {
      const { roomId, userId, message } = data;

      try {
        // Fetch room data from the backend
        const response = await axios.get(`http://localhost:5000/api/rooms/${roomId}`);
        const roomData = response.data;
        console.log(roomId);
        if (roomData && roomData.users && roomData.users.includes(userId)) {
          // If the room exists and the user is in the room, send the message
          console.log(`Message from ${userId} to room ${roomId}: "${message}"`);
          io.to(roomId).emit('receiveMessage', { userId, message });
        } else {
          // If the room does not exist or user is not in the room
          console.log(`User ${userId} is not in room ${roomId}`);
          socket.emit('error', { message: 'User is not part of this room' });
        }
      } catch (error) {
        console.error(`Error fetching room data for roomId ${roomId}:`, error);
        socket.emit('error', { message: 'Error fetching room data' });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
