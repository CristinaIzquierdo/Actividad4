import { addNoticia } from '../../schemas/noticias.schema.js';

export const noticiasPath = {
  get: {
    tags: ['noticia'],
    summary: 'Obtiene todas las noticias',
    operationId: 'getAllNews',
    responses: {
      200: {
        description: 'Operacion OK',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Noticia',
            },
          },
        },
      },
      404: {
        description: 'ERROR: las noticias no se han encontrado',
        content: {},
      },
    },
  },
  post: {
    tags: ['noticia'],
    summary: 'Crear noticia',
    description: 'Reporteros',
    operationId: 'addNoticia',
    requestBody: {
      description: 'Created news object',
      content: {
        'application/json': {
          schema: addNoticia,
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
