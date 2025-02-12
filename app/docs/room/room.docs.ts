export const roomRoutesDocs = {
  '/rooms': {
    post: {
      summary: 'Create Room',
      description: 'Creates a new room in the system.',
      tags: ['Rooms'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'isPrivate', 'createdById', 'members'],
              properties: {
                name: { type: 'string', description: 'Room name' },
                isPrivate: { type: 'boolean', description: 'Room privacy status' },
                createdById: { type: 'string', description: 'Admin ID' },
                members: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of member IDs',
                },
              },
            },
          },
        },
      },
      responses: {
        201: { description: 'Room created successfully.' },
        400: { description: 'Invalid input.' },
      },
    },
  },
  '/rooms/{roomId}': {
    get: {
      summary: 'Get Room Details',
      description: 'Fetches details of a specific room.',
      tags: ['Rooms'],
      parameters: [
        {
          name: 'roomId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Room ID',
        },
      ],
      responses: {
        200: { description: 'Room details retrieved successfully.' },
        404: { description: 'Room not found.' },
      },
    },
  },
  '/rooms/invite': {
    post: {
      summary: 'Send Invite Link',
      description: 'Sends an invite link to a user for a room.',
      tags: ['Rooms'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['roomId', 'userId', 'toBeInvitedId'],
              properties: {
                roomId: { type: 'string', description: 'Room ID' },
                userId: { type: 'string', description: 'User ID sending the invite' },
                toBeInvitedId: { type: 'string', description: 'User ID to be invited' },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'Invite link sent successfully.' },
        400: { description: 'Invalid input.' },
        404: { description: 'Room or user not found.' },
      },
    },
  },
  '/rooms/{roomId}/invite': {
    patch: {
      summary: 'Handle Invitation Link',
      description: 'Handles user invitation to a room using a token.',
      tags: ['Rooms'],
      parameters: [
        {
          in: 'path',
          name: 'roomId',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The ID of the room where the invitation is being processed.',
        },
        {
          in: 'query',
          name: 'token',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'JWT token containing invitation details.',
        },
      ],
      responses: {
        200: { description: 'Invitation processed successfully.' },
        400: { description: 'Invalid request parameters.' },
        401: { description: 'Unauthorized request.' },
        404: { description: 'Room not found.' },
      },
    },
  },
  '/rooms/{roomId}/{action}': {
    patch: {
      summary: 'Update Room Members',
      description: 'Adds or removes members from a room.',
      tags: ['Rooms'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['members'],
              properties: {
                members: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of member IDs',
                },
              },
            },
          },
        },
      },
      parameters: [
        {
          name: 'roomId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Room ID',
        },
        {
          name: 'action',
          in: 'path',
          required: true,
          schema: { type: 'string', enum: ['add', 'remove'] },
          description: 'Action to perform (add/remove members)',
        },
      ],
      responses: {
        200: { description: 'Room members updated successfully.' },
        400: { description: 'Invalid action.' },
      },
    },
  },
  '/rooms/{roomId}/members': {
    get: {
      summary: 'Get Room Members',
      description: 'Fetches all members of a room.',
      tags: ['Rooms'],
      parameters: [
        {
          name: 'roomId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Room ID',
        },
      ],
      responses: {
        200: { description: 'List of room members retrieved successfully.' },
        404: { description: 'Room not found.' },
      },
    },
  },
};
