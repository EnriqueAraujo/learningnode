import { Router } from 'express';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import DelivererController from './app/controllers/DelivererController';

import authMiddleware from './app/middlewares/auth'

const routes = new Router();

routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.put('/recipients/:id', RecipientController.update);
routes.post('/recipients', RecipientController.store);

routes.get('/deliverers', DelivererController.index);
routes.post('/deliverers', DelivererController.store);

export default routes;
