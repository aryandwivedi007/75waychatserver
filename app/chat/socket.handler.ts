import { Server, Socket } from 'socket.io';
import axios from 'axios';

// A function to initialize socket event handling
export const initSocketEvents = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('A user connected');
    
    // Join a room
    socket.on('joinRoom', async (data) => {
      const { roomId, userId } = data;

      try {
        // Fetch room data from the backend
        const response = await axios.get(`http://localhost:5000/api/rooms/48e1886a-615f-4e55-b8ee-8cdc14e6aba5`);
        const roomData = response.data;
        console.log("hdfjsfjkd",roomData)
        if (roomData) {
          socket.join(roomId);
          console.log(`User ${userId} joined room: ${roomId}`);
        //   console.log(`Users in room ${roomId}: ${roomData.users.join(", ")}`);
        } else {
          console.log(`Room ${roomId} not found in the database.`);
        }
      } catch (error) {
        console.error(`Error fetching room data for roomId ${roomId}:`, error);
      }
    });

    // Handle messages
    socket.on('sendMessage', async (data) => {
      const { roomId, userId, message } = data;

      try {
        // Fetch room data from the backend
        const response = await axios.get(`http://localhost:5000/api/rooms/48e1886a-615f-4e55-b8ee-8cdc14e6aba5`);
        const roomData = response.data;
        console.log("hdfjsfjkd",roomData)
        if (roomData) {
          console.log(`Message from ${userId} to room ${roomId}: "${message}"`);
          console.log(`Users involved in room ${roomId}: ${roomData.users.join(", ")}`);
          io.to(roomId).emit('receiveMessage', { userId, message });
        } else {
          console.log(`Room ${roomId} not found in the database.`);
        }
      } catch (error) {
        console.error(`Error fetching room data for roomId ${roomId}:`, error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
