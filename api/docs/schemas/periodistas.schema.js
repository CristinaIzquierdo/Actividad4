export const periodista = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    nombre: {
      type: 'string',
    },
    fechaNacimiento: {
      type: 'string',
      required: false,
    },
    noticias: {
      type: 'array',
      required: false,
      items: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
          },
          titulo: {
            type: 'string',
          },
          texto: {
            type: 'string',
          },
        },
      },
    },
  },
};

export const addPeriodista = {
  type: 'object',
  properties: {
    nombre: {
      type: 'string',
    },
    fechaNacimiento: {
      type: 'date',
      pattern: '/([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/',
      example: '2019-05-17',
    },
  },
};
