export const noticiasIdPath = {
  get: {
    tags: ['noticia'],
    summary: 'Obtiene una noticia por Id',
    operationId: 'getNewsById',
    parameters: [
      {
        name: '_id',
        in: 'path',
        description: 'El id de las noticias se almacena en MongoDB',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'Operacion OK',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Noticia',
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
        description: 'ERROR: la noticia no se ha encontrado',
        content: {},
      },
    },
  },
  delete: {
    tags: ['noticia'],
    summary: 'Eliminar noticia',
    description: 'Elimina una noticia por Id',
    operationId: 'deleteNewsById',
    parameters: [
      {
        name: '_id',
        in: 'path',
        description: 'El id de las noticias se almacena en MongoDB',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      404: {
        description: 'ERROR: la noticia no se ha encontrado',
        content: {},
      },
    },
  },
};
