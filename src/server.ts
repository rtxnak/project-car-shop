import CarRouter from './routes/CarRoutes';
import App from './app';

import CarController from './controllers/CarController';

import { Car } from './interfaces/CarInterface';

const server = new App();

const carsController = new CarController();

const carRouter = new CarRouter<Car>();
carRouter.addRoute(carsController);

server.addRouter(carRouter.router);

export default server;
