import HTTPStatus from 'http-status';
import createRoutesFromModel from 'business-chat-backend/routes/createRoutesFromModel';
import expect from 'business-chat-backend/tests/expect';
import sinon from 'sinon';

const router = {
  get(path, procedure) {
    this.routes.GET[path] = procedure;

    return this;
  },

  post(path, procedure) {
    this.routes.POST[path] = procedure;

    return this;
  },

  routes: {
    GET: {},
    POST: {},
  },
};

const model = {
  find(id) {
    return id === 'correctId' ? Promise.resolve() : Promise.reject();
  },

  save(object) {
    return object.foo === 'correctFooValue' ? Promise.resolve() : Promise.reject();
  },
};

let newRouter;

describe('createRoutesFromModel', () => {
  beforeEach('call createRoutesFromModel', () => {
    newRouter = createRoutesFromModel(router, model);
  });

  it('returns the same router', () => {
    expect(newRouter).to.equal(router);
  });

  describe('get', () => {
    it('returns ok status when model validates', () => {
      const status = sinon.stub();
      const json = sinon.stub();
      const end = sinon.stub();
      status.returns({ end, json });
      const res = {
        status,
      };
      const req = {
        params: {
          id: 'correctId',
        },
      };

      return router.routes.GET['/:id'](req, res)
        .then(() => expect(status).to.have.been.calledWithExactly(HTTPStatus.OK));
    });

    it('returns not found status when model invalidates', () => {
      const status = sinon.stub();
      const json = sinon.stub();
      const end = sinon.stub();
      status.returns({ end, json });
      const res = {
        status,
      };
      const req = {
        params: {
          id: 'inCorrectId',
        },
      };

      return router.routes.GET['/:id'](req, res)
        .then(() => expect(status).to.have.been.calledWithExactly(HTTPStatus.NOT_FOUND));
    });
  });

  describe('post', () => {
    it('returns created status when model validates', () => {
      const status = sinon.stub();
      const json = sinon.stub();
      const end = sinon.stub();
      status.returns({ end, json });
      const res = {
        status,
      };
      const req = {
        body: {
          foo: 'correctFooValue',
        },
      };

      return router.routes.POST['/'](req, res)
        .then(() => expect(status).to.have.been.calledWithExactly(HTTPStatus.CREATED));
    });

    it('returns bad request status when model invalidates', () => {
      const status = sinon.stub();
      const json = sinon.stub();
      const end = sinon.stub();
      status.returns({ end, json });
      const res = {
        status,
      };
      const req = {
        body: {
          foo: 'inCorrectFooValue',
        },
      };

      return router.routes.POST['/'](req, res)
        .then(() => expect(status).to.have.been.calledWithExactly(HTTPStatus.BAD_REQUEST));
    });
  });
});
