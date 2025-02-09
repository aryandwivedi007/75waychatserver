const createUserDocs = {
  '/users': {
    post: {
      summary: 'Create User',
      description: 'Creates a new user in the system.',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['userName', 'email', 'password', 'role'],
              properties: {
                userName: {
                  type: 'string',
                  example: 'johndoe',
                  description: 'The username of the user',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'johndoe@example.com',
                  description: 'The email address of the user',
                },
                password: {
                  type: 'string',
                  example: 'password123',
                  description: 'The password of the user',
                },
                active: {
                  type: 'boolean',
                  example: true,
                  description: 'If true, the user will be active',
                },
                role: {
                  type: 'string',
                  enum: ['USER', 'ADMIN'],
                  description: 'The role of the user',
                  example: 'USER',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'User created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: {
                    type: 'string',
                    example: 'User created successfully!',
                  },
                  data: {
                    type: 'object',
                    properties: {
                      _id: {
                        type: 'string',
                        example: '64d9a4d7b5e4d1e1d5a8a9b3',
                      },
                      userName: { type: 'string', example: 'johndoe' },
                      email: { type: 'string', example: 'johndoe@example.com' },
                      active: { type: 'boolean', example: true },
                      role: { type: 'string', example: 'USER' },
                    },
                  },
                },
              },
            },
          },
        },
        400: { description: 'Bad Request - Missing or invalid fields' },
        500: { description: 'Internal Server Error' },
      },
    },
  },

  '/users/{userId}': {
    get: {
      summary: 'Get User by ID',
      description: 'Fetches details of a user by their ID.',
      tags: ['Users'],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            example: '64d9a4d7b5e4d1e1d5a8a9b3',
          },
          description: 'The ID of the user to fetch',
        },
      ],
      responses: {
        200: {
          description: 'User found successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: {
                    type: 'string',
                    example: 'User fetched successfully!',
                  },
                  data: {
                    type: 'object',
                    properties: {
                      _id: {
                        type: 'string',
                        example: '64d9a4d7b5e4d1e1d5a8a9b3',
                      },
                      userName: { type: 'string', example: 'johndoe' },
                      email: { type: 'string', example: 'johndoe@example.com' },
                      active: { type: 'boolean', example: true },
                      role: { type: 'string', example: 'USER' },
                    },
                  },
                },
              },
            },
          },
        },
        404: { description: 'User not found' },
        500: { description: 'Internal Server Error' },
      },
    },
    put: {
      summary: 'Update User',
      description: "Updates a user's details.",
      tags: ['Users'],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            example: '64d9a4d7b5e4d1e1d5a8a9b3',
          },
          description: 'The ID of the user to update',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                userName: {
                  type: 'string',
                  example: 'johndoe',
                  description: 'The username of the user',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'johndoe@example.com',
                  description: 'The email address of the user',
                },
                password: {
                  type: 'string',
                  example: 'newpassword123',
                  description: 'The password of the user (if updating)',
                },
                active: {
                  type: 'boolean',
                  example: true,
                  description: 'If true, the user will be active',
                },
                role: {
                  type: 'string',
                  enum: ['USER', 'ADMIN'],
                  description: 'The role of the user',
                  example: 'USER',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'User updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: {
                    type: 'string',
                    example: 'User updated successfully!',
                  },
                  data: {
                    type: 'object',
                    properties: {
                      _id: {
                        type: 'string',
                        example: '64d9a4d7b5e4d1e1d5a8a9b3',
                      },
                      userName: { type: 'string', example: 'johndoe' },
                      email: { type: 'string', example: 'johndoe@example.com' },
                      active: { type: 'boolean', example: true },
                      role: { type: 'string', example: 'USER' },
                    },
                  },
                },
              },
            },
          },
        },
        400: { description: 'Bad Request - Invalid fields' },
        404: { description: 'User not found' },
        500: { description: 'Internal Server Error' },
      },
    },
  },
};

export default createUserDocs;
