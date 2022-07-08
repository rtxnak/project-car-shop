import { expect } from 'chai';
import mongoose from 'mongoose';
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import { newCar, newCarResponse, carArrayResponse } from '../mocks/car.mock'

describe('CarModel tests', () => {

  describe('create function test', () => {
    const carModel = new CarModel();
    before(async () => {
      sinon.stub(mongoose.Model, 'create').resolves(newCarResponse);
    })

    after(() => {
      sinon.restore();
    })

    it('return the correct response', async () => {
      const car = await carModel.create(newCar);
      expect(car).to.be.equal(newCarResponse);
    })
  });

  describe('read function test', () => {
    const carModel = new CarModel();
    before(async () => {
      sinon.stub(mongoose.Model, 'find').resolves(carArrayResponse);
    })

    after(() => {
      sinon.restore();
    })

    it('return the correct response', async () => {
      const car = await carModel.read();
      expect(car).to.be.equal(carArrayResponse);
    })
  })
})

// como fazer stub com mongoose https://stackoverflow.com/questions/11318972/stubbing-a-mongoose-model-with-sinon