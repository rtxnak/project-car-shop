import { Router } from 'express';
import MongoController from '../controllers/MongoController';

class CarRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: MongoController<T>,
    route: string = controller.route,
  ) {
    this.router.post(route, controller.create);
  }
}

export default CarRouter;