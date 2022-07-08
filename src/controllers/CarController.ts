import { Request, Response } from 'express';
import MongoController,
{ RequestWithBody, ResponseError } from './MongoController';
import CarsService from '../services/CarsService';
import { Car } from '../interfaces/CarInterface';

export default class CarController extends MongoController<Car> {
  private $route: string;

  constructor(
    service = new CarsService(),
    route = '/cars',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const car = await this.service.create(body);
      if (!car) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in car) {
        return res.status(400).json(car);
      }
      return res.status(201).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const car = await this.service.readOne(id);
      if (car === undefined) {
        return res.status(400).json({ error: this.errors.badLength });
      }
      if (!car) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(200).json(car);
    } catch (error) {
      return res.status(500).json({ error: this.errors.badRequest });
    }
  };
}
