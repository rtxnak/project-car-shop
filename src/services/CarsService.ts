import MongoService, { ServiceError } from './MongoService';
import { Car, CarSchema } from '../interfaces/CarInterface';
import CarModel from '../models/Car';

class CarsService extends MongoService<Car> {
  private idLength = 24;
  
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

  public async readOne(id: string): 
  Promise<Car | null | undefined | ServiceError> {
    if (id.length !== this.idLength) return undefined;
    return this.model.readOne(id);
  }

  public async update(id: string, obj: Car):
  Promise<Car | null | undefined | ServiceError | string> {
    if (id.length !== this.idLength) return 'badIdLenght';
    const parsed = CarSchema.safeParse(obj);
    if (!parsed.success) {
      return undefined;
    }
    return this.model.update(id, obj);
  }
}

export default CarsService;