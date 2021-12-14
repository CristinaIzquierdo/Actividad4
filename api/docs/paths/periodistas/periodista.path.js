import { periodista, addPeriodista } from '../../schemas/periodistas.schema.js';

export const periodistaPath = {
  get: {
    tags: ['periodista'],
    summary: 'Obtiene todos los periodistas',
    operationId: 'getAllPeriodistas',
    responses: {
      200: {
        description: 'Operacion OK',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: periodista,
            },
          },
        },
      },
      404: {
        description: 'ERROR: los periodistas no se han encontrado',
        content: {},
      },
    },
  },
  post: {
    tags: ['periodista'],
    summary: 'Crear periodista',
    description: 'Periodistas',
    operationId: 'addPeriodista',
    requestBody: {
      description: 'Creado objecto periodista',
      content: {
        'application/json': {
          schema: addPeriodista,
        },
      },
      required: true,
    },
    responses: {
      default: {
        description: 'Operacion OK',
        content: {},
      },
    },
    'x-codegen-request-body-name': 'body',
  },
};
