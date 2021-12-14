import express from 'express';

const route = express.Router();

import * as periodistaController from '../controllers/periodistas.controller.js';

route.get('/', periodistaController.get);
route.get('/:id', periodistaController.getById);

route.post('/', periodistaController.addPeriodista);

route.put('/:id', periodistaController.updateOneById);

route.delete('/:id', periodistaController.deleteOneById);
export { route };
