import express from 'express';

const route = express.Router();

import * as noticiasController from '../controllers/noticias.controllers.js';

route.get('/', noticiasController.get);
route.get('/:id', noticiasController.getById);
route.get('/periodista/:id', noticiasController.getNoticiaByIdPeriodista);

route.post('/', noticiasController.add);

route.delete('/:id', noticiasController.deleteNoticia);

export { route };
