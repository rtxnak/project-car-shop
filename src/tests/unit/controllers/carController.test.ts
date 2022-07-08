import * as sinon from 'sinon';
import { expect } from 'chai';

import { Request, Response } from 'express';
import CarController from '../../../controllers/CarController';
import { newCar, newCarResponse, newCarInvalidResponse, carArrayResponse } from '../mocks/car.mock';


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

  describe('read function test', () => {
    const carController = new CarController();
    const req = {} as Request;
    const res = {} as Response;
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(carController.service, 'read').resolves(carArrayResponse);
    })

    after(() => {
      sinon.restore();
    })

    it('return status 200, and correct car json on SUCCESS', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carArrayResponse)).to.be.true;
    })
  });

  describe('readOne function test', () => {

    describe('on SUCCESS', () => {
      const carController = new CarController();
      const req = {} as Request<{ id: string; }>;
      const res = {} as Response;
      before(async () => {
        req.params = { id: newCarResponse._id };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        sinon.stub(carController.service, 'readOne').resolves(newCarResponse);
      })

      after(() => {
        sinon.restore();
      })

      it('return status 200, and correct car json on SUCCESS', async () => {
        await carController.readOne(req, res);

        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(newCarResponse)).to.be.true;
      })
    })

    describe('on FAIL with invalid id', () => {
      const carController = new CarController();
      const req = {} as Request<{ id: string; }>;
      const res = {} as Response;
      before(async () => {
        req.params = { id: newCarResponse._id };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        sinon.stub(carController.service, 'readOne').resolves(undefined);
      })

      after(() => {
        sinon.restore();
      })

      it('return status 400, and error', async () => {
        await carController.readOne(req, res);

        expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith({ error: 'Id must have 24 hexadecimal characters' })).to.be.true;
      })
    });

    describe('on FAIL with non-existent id', () => {
      const carController = new CarController();
      const req = {} as Request<{ id: string; }>;
      const res = {} as Response;
      before(async () => {
        req.params = { id: newCarResponse._id };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        sinon.stub(carController.service, 'readOne').resolves(null);
      })

      after(() => {
        sinon.restore();
      })

      it('return status 404, and error', async () => {
        await carController.readOne(req, res);

        expect((res.status as sinon.SinonStub).calledWith(404)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith({ error: 'Object not found' })).to.be.true;
      })
    })
  })

})
