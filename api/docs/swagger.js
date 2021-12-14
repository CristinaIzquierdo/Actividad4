import { noticia } from './schemas/noticias.schema.js';
import { periodista } from './schemas/periodistas.schema.js';
import { recurso } from './schemas/recursos.schema.js';
import { noticiasPath } from '././paths/noticias/noticias.path.js';
import { noticiasIdPath } from '././paths/noticias/noticiasId.path.js';
import { noticiasPeriodistaIdPath } from '././paths/noticias/noticiasPeriodistaId.path.js';
import { periodistaPath } from '././paths/periodistas/periodista.path.js';
import { periodistaIdPath } from './paths/periodistas/periodistaId.path.js';

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    description:
      'Aplicación de gestión de un periódico de noticias, con reporteros y recursos.',
    version: '1.0.0',
    title: 'API periódico CPIFPPirámide',
    contact: {
      email: 'cristinaizquierdo2000@gmail.com',
    },
    license: {
      name: 'ISC',
      url: 'https://opensource.org/licenses/ISC',
    },
  },
  host: 'localhost:8080',
  basePath: '/api/v.01/',
  tags: [
    {
      name: 'periodista',
      description: 'Operaciones de periodistas',
      externalDocs: {
        description: 'Base address',
        url: 'http://localhost:8080/api/v.01/periodistas',
      },
    },
    {
      name: 'noticia',
      description: 'Operaciones de noticias',
      externalDocs: {
        description: 'Base address',
        url: 'http://localhost:8080/api/v.01/noticias',
      },
    },
  ],
  servers: [
    {
      url: 'http://localhost:8080/api/v.01/',
    },
  ],
  paths: {
    '/noticias': noticiasPath,
    '/noticias/{_id}': noticiasIdPath,
    '/noticias/periodista/{id}': noticiasPeriodistaIdPath,
    '/periodistas': periodistaPath,
    '/periodistas/{_id}': periodistaIdPath,
  },
  components: {
    schemas: {
      Noticia: noticia,
      Periodista: periodista,
      Recurso: recurso,
    },
  },
};
export { swaggerDocument };
