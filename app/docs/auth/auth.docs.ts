export const authRoutesDocs = {
  '/auth/authenticate': {
    post: {
      summary: 'Authenticate User',
      description:
        'Authenticates a user by validating their login credentials and returns a JWT token.',
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  description: 'The email of the user.',
                  example: 'ranga@gmail.com',
                },
                password: {
                  type: 'string',
                  description: 'The password of the user.',
                  example: 'dummy',
                },
              },
              required: ['email', 'password'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Authentication successful.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: {
                    type: 'string',
                    description: 'The JWT token generated upon successful authentication.',
                    example:
                      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Invalid credentials or bad request.',
        },
        401: {
          description: 'Unauthorized - invalid email or password.',
        },
      },
    },
  },
};
