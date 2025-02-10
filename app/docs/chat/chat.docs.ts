export const chatRoutesDocs = {
  '/chat': {
    post: {
      summary: 'Send Message',
      description: 'Sends a message to a specific room.',
      tags: ['Messages'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['roomId', 'userId', 'message'],
              properties: {
                roomId: {
                  type: 'string',
                  description: 'The ID of the room to send the message to',
                },
                userId: { type: 'string', description: 'The ID of the user sending the message' },
                message: { type: 'string', description: 'The message content' },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'Message sent successfully.' },
        400: { description: 'Invalid request body or missing fields.' },
      },
    },
  },
  // '/messages/{roomId}': {
  //   get: {
  //     summary: 'Get Messages from Room',
  //     description: 'Retrieves all messages from a specific chat room.',
  //     tags: ['Messages'],
  //     parameters: [
  //       {
  //         name: 'roomId',
  //         in: 'path',
  //         required: true,
  //         schema: { type: 'string' },
  //         description: 'The ID of the room to fetch messages from',
  //       },
  //     ],
  //     responses: {
  //       200: {
  //         description: 'Messages retrieved successfully.',
  //         content: {
  //           'application/json': {
  //             schema: {
  //               type: 'array',
  //               items: {
  //                 type: 'object',
  //                 properties: {
  //                   messageId: { type: 'string', description: 'The ID of the message' },
  //                   roomId: { type: 'string', description: 'The ID of the room' },
  //                   userId: { type: 'string', description: 'The ID of the sender' },
  //                   message: { type: 'string', description: 'The message content' },
  //                   timestamp: { type: 'string', format: 'date-time', description: 'The timestamp of the message' },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //       404: { description: 'Room not found or no messages available.' },
  //     },
  //   },
  // },
};
