import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import UserController from './controllers/UserController';
import CarController from './controllers/CarController';
import SessionController from './controllers/SessionController';
import FileController from './controllers/FileController';
import ProviderController from './controllers/ProviderController';
import AppointmentController from './controllers/AppointmentController';
import ScheduleController from './controllers/ScheduleController';

import authMiddleware from './middlewares/auth';

const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.get('/cars', CarController.index);
routes.post('/cars', upload.single('image'), CarController.store);
routes.delete('/cars/:id', CarController.delete);

routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);

routes.get('/schedule', ScheduleController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
