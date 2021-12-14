import express from 'express';

const route = express.Router();

import * as viewsController from '../controllers/views.controller.js';

route.get('/', viewsController.get);
route.get('/:id', viewsController.getNoticiaByIdPeriodista);

export { route };
