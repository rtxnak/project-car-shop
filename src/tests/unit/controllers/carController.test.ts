import  * as sinon from 'sinon';
import { expect } from 'chai';

import { Request, Response } from 'express';
import CarController from '../../../controllers/CarController';
import { newCar, newCarResponse, newCarInvalidResponse } from '../mocks/car.mock';


describe('CarController tests', () => {

  describe('create function test', () => {

    describe('on SUCCESS', () => {
      const carController = new CarController();
      const req = {} as Request;
      const res = {} as Response;
      before(async () => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.body = newCar;
        sinon.stub(carController.service, 'create').resolves(newCarResponse);
      })

      after(() => {
        sinon.restore();
      })

      it('return status 201, and correct car json on SUCCESS', async () => {
        await carController.create(req, res);

        expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(newCarResponse)).to.be.true;
      })
    })

    describe('on FAIL with null response', () => {
      const carController = new CarController();
      const req = {} as Request;
      const res = {} as Response;
      before(async () => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.body = newCar;
        sinon.stub(carController.service, 'create').resolves(null);
      })

      after(() => {
        sinon.restore();
      })

      it('return status 500', async () => {
        await carController.create(req, res);
        expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;
      })
    })

    describe('on FAIL with invalid body', () => {
      const carController = new CarController();
      const req = {} as Request;
      const res = {} as Response;
      before(async () => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.body = newCar;
        sinon.stub(carController.service, 'create').resolves(newCarInvalidResponse as any);
      })

      after(() => {
        sinon.restore();
      })

      it('return status 400', async () => {
        await carController.create(req, res);
        expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;

        expect((res.json as sinon.SinonStub).calledWith(newCarInvalidResponse)).to.be.equal(true);
      })
    })

  })
})
