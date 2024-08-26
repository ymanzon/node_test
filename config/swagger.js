const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API service descriptions',
      version: '1.0.0',
      description: 'API webservices',
    },
    servers: [
      {
        url: 'http://192.168.0.4:3000/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'email', 'password', 'role', 'language', 'status'],
          properties: {
            username: {
              type: 'string',
              description: 'Username for the user. It should be unique and between 3 to 50 characters.',
              example: 'johndoe',
              minLength: 3,
              maxLength: 50,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email of the user. Must be a valid email format.',
              example: 'johndoe@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Password for the user. It should be at least 8 characters long and contain a mix of letters, numbers, and special characters.',
              example: 'Password123!',
              minLength: 8,
            },
            role: {
              type: 'string',
              description: 'Role of the user in the system',
              enum: ['admin', 'user', 'guest'], // Opciones disponibles para el campo "role"
              example: 'user',
            },
            language: {
              type: 'string',
              description: 'Preferred language of the user',
              enum: ['en', 'es', 'fr'], // Opciones disponibles para el campo "language"
              example: 'en',
            },
            status: {
              type: 'string',
              description: 'Account status of the user',
              enum: ['active', 'inactive', 'suspended'], // Opciones para "status"
              example: 'active',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Rutas de archivos para documentar
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
