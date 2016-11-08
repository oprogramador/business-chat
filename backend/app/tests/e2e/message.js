import HTTPStatus from 'http-status';
import app from 'business-chat-backend/tests/app';
import { configureDatabase } from 'business-chat-backend/model/Models';
import faker from 'faker';
import request from 'supertest-as-promised';

describe('Message API', () => {
  beforeEach('recreate database', () => {
    const newDatabaseName = `test-${faker.random.uuid()}`;

    return configureDatabase(newDatabaseName);
  });

  describe('save', () => {
    it('saves object', () => {
      const team = {
        name: 'foo',
      };
      const room = {
        name: 'foo',
      };
      const sender = {
        username: 'foo',
      };
      const message = {
        text: 'lorem ipsum',
      };

      let roomId;

      return request(app)
        .post('/team/')
        .send(team)
          .then(({ body: teamResult }) =>
            request(app)
              .post('/room/')
              .send(Object.assign({}, room, { teamId: teamResult.id }))
          )
          .then(({ body: roomResult }) => {
            roomId = roomResult.id;
          })
          .then(() =>
            request(app)
              .post('/user/')
              .send(sender)
          )
          .then(({ body: senderResult }) =>
            request(app)
              .post('/message/')
              .send(Object.assign({}, message, { roomId, senderId: senderResult.id }))
              .expect(HTTPStatus.CREATED)
          );
    });
  });
});
