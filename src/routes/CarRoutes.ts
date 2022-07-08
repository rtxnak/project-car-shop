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
    this.router.get(route, controller.read);
    this.router.post(route, controller.create);
    this.router.get(`${route}/:id`, controller.readOne);
    this.router.put(`${route}/:id`, controller.update);
  }
}

export default CarRouter;