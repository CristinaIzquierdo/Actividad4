import { noticia } from '../../schemas/noticias.schema.js';

export const noticiasPeriodistaIdPath = {
  get: {
    tags: ['noticia'],
    summary: 'Obtiene las noticias de un periodista',
    operationId: 'getNewsByPeriodistaId',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'El id del periodista',
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
              type: 'array',
              items: noticia,
            },
          },
          'application/xml': {
            schema: {
              $ref: '#/components/schemas/Noticia',
            },
          },
        },
      },
      404: {
        description: 'ERROR: no se ha encontrado el periodista',
        content: {},
      },
    },
  },
};
