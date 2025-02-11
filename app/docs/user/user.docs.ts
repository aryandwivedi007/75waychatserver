export const userRoutesDocs = {
  '/users': {
    post: {
      summary: 'User',
      description: 'Creates a new user in the system.',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                userName: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                // Add more fields here as needed
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'User created successfully.',
        },
        400: {
          description: 'Invalid input.',
        },
      },
    },
  },
  '/users/{userId}': {
    get: {
      summary: 'Get User By ID',
      description: 'Fetches a user by their ID.',
      tags: ['Users'],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'User found successfully.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  userId: { type: 'string' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                  // Add other fields here as needed
                },
              },
            },
          },
        },
        404: {
          description: 'User not found.',
        },
      },
    },
    put: {
      summary: 'Update User',
      description: 'Updates user details by their ID.',
      tags: ['Users'],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                userName: { type: 'string' },
                email: { type: 'string' },
                active: { type: 'boolean' },
                role: { type: 'string' },
                // Add other fields to update here as needed
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'User updated successfully.',
        },
        400: {
          description: 'Invalid input.',
        },
        404: {
          description: 'User not found.',
        },
      },
    },
    patch: {
      summary: 'Edit User',
      description: 'Partially updates user details by their ID.',
      tags: ['Users'],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                userName: { type: 'string' },
                email: { type: 'string' },
                active: { type: 'boolan' },
                // Add other fields for partial updates here
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'User partially updated successfully.',
        },
        400: {
          description: 'Invalid input.',
        },
        404: {
          description: 'User not found.',
        },
      },
    },
    delete: {
      summary: 'Delete User',
      description: 'Deletes a user by their ID.',
      tags: ['Users'],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'User deleted successfully.',
        },
        404: {
          description: 'User not found.',
        },
      },
    },
  },
  '/users/{userId}/getAllRooms': {
    get: {
      summary: 'Get All Rooms of a User',
      description: 'Fetches all the rooms/groups associated with a user.',
      tags: ['Users'],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Rooms fetched successfully.',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    roomId: { type: 'string' },
                    roomName: { type: 'string' },
                    // Add other room properties here
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'User not found.',
        },
      },
    },
  },
  '/users/{email}/find': {
    get: {
      summary: 'Find User By Email',
      description: 'Fetches a user by their email.',
      tags: ['Users'],
      parameters: [
        {
          name: 'email',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'User found successfully.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  userId: { type: 'string' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                  // Add other user properties here
                },
              },
            },
          },
        },
        404: {
          description: 'User not found.',
        },
      },
    },
  },
};
