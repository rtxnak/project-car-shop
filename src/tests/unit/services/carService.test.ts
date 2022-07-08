import { expect } from 'chai';
import mongoose from 'mongoose';
import sinon from 'sinon';
import CarsService from '../../../services/CarsService';
import { newCar, newCarResponse, newCarInvalid, carArrayResponse } from '../mocks/car.mock'

describe('CarService tests', () => {

  describe('create function test', () => {
    const carService = new CarsService();
    before(async () => {
      sinon.stub(mongoose.Model, 'create').resolves(newCarResponse);
    })

    after(() => {
      sinon.restore();
    })

    it('return the correct response on SUCCESSFUL', async () => {
      const car = await carService.create(newCar);
      expect(car).to.be.equal(newCarResponse);
    })

    it('return the correct response on FAILURE', async () => {
      const car = await carService.create(newCarInvalid as any);
      expect(car).to.have.all.keys(['error']);
    })
  });

  describe('read function test', () => {
    const carService = new CarsService();
    before(async () => {
      sinon.stub(mongoose.Model, 'find').resolves(carArrayResponse);
    })

    after(() => {
      sinon.restore();
    })

    it('return the correct response on SUCCESSFUL', async () => {
      const car = await carService.read();
      expect(car).to.be.equal(carArrayResponse);
    })
  });

  describe('readOne function test', () => {
    const carService = new CarsService();
    before(async () => {
      sinon.stub(mongoose.Model, 'findOne').resolves(newCarResponse);
    })

    after(() => {
      sinon.restore();
    })

    it('return the correct response on SUCCESSFUL', async () => {
      const car = await carService.readOne(newCarResponse._id);
      expect(car).to.be.equal(newCarResponse);
    });

    it('return the correct response on FAILURE', async () => {
      const car = await carService.readOne('wrong_id');
      expect(car).to.be.equal(undefined);
    });
  })
})