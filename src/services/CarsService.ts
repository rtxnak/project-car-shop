import MongoService, { ServiceError } from './MongoService';
import { Car, CarSchema } from '../interfaces/CarInterface';
import CarModel from '../models/Car';

class CarsService extends MongoService<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car): Promise<Car | ServiceError | null> => {
    const parsed = CarSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };

  public async read(): Promise<Car[]> {
    return this.model.read();
  }
}

export default CarsService;