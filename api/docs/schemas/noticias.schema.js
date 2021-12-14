import { periodista } from './periodistas.schema.js';
import { recurso } from './recursos.schema.js';

export const noticia = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    text: {
      type: 'string',
    },
    periodista: {
      type: 'array',
      required: false,
      items: periodista,
    },
    recurso: {
      type: 'array',
      required: false,
      items: recurso,
    },
  },
};

export const addNoticia = {
  type: 'object',
  properties: {
    titulo: {
      type: 'string',
    },
    texto: {
      type: 'string',
    },
    periodista: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
    recurso: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
  },
};
