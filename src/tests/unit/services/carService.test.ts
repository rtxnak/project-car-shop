import { expect } from 'chai';
import mongoose from 'mongoose';
import sinon from 'sinon';
import CarsService from '../../../services/CarsService';
import { newCar, newCarResponse, newCarInvalid } from '../mocks/car.mock'

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
  })
})