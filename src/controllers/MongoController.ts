import { Request, Response } from 'express';
import MongoService from '../services/MongoService';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
}

abstract class MongoController<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(public service: MongoService<T>) { }
  
  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const objs = await this.service.read();
      return res.json(objs);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default MongoController;
