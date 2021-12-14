export const recurso = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    url: {
      type: 'string',
      required: false,
    },
  },
  xml: {
    name: 'Resource',
  },
};
