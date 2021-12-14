export const periodistaIdPath = {
  get: {
    tags: ['periodista'],
    summary: 'Obtiene un periodista por id',
    operationId: 'getPeriodistaById',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'El id del periodista se almacena en mysql',
        required: true,
        schema: {
          type: 'number',
        },
      },
    ],
    responses: {
      200: {
        description: 'Operacion OK',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Periodista',
            },
          },
        },
      },
      404: {
        description: 'ERROR: el periodista no se ha encontrado',
        content: {},
      },
    },
  },
  put: {
    tags: ['periodista'],
    summary: 'Actualiza un periodista',
    description: 'Actualiza un periodista por id',
    operationId: 'updatePeriodista',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'El id del periodista se almacena en mysql',
        required: true,
        schema: {
          type: 'number',
        },
      },
    ],
    requestBody: {
      description: 'Periodista a actualizar',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              birthDate: {
                type: 'date',
                pattern: '/([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/',
                example: '2019-05-17',
              },
            },
          },
        },
      },
      required: true,
    },
    responses: {
      400: {
        description: 'ERROR: el periodista no se ha actualizado',
        content: {},
      },
      404: {
        description: 'ERROR: el periodista no se ha encontrado',
        content: {},
      },
    },
    'x-codegen-request-body-name': 'body',
  },
  delete: {
    tags: ['periodista'],
    summary: 'Elimina un periodista',
    description: 'Elimina un periodista por id',
    operationId: 'deleteReporter',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'El id del periodista se almacena en mysql',
        required: true,
        schema: {
          type: 'number',
        },
      },
    ],
    responses: {
      404: {
        description: 'ERROR: el periodista no se ha encontrado',
        content: {},
      },
    },
  },
};
