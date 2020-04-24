import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';


import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth'

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.put('/recipients/:id', RecipientController.update);
routes.post('/recipients', RecipientController.store);

routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);

routes.post('/avatar-delveryman', upload.single('file'), FileController.store);

export default routes;
