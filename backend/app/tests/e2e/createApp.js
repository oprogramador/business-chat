import HTTPStatus from 'http-status';
import createApp from 'business-chat-backend/routes/createApp';
import request from 'supertest-as-promised';

describe('createApp', () => {
  it('creates APP', () =>
    createApp({ dbName: 'foo', loggerMiddleware: (req, res, next) => next(), port: 1234 })
      .then(app => request(app)
        .post('/object')
        .auth('foo', 'foo')
        .expect(HTTPStatus.OK)
     )
  );
});

