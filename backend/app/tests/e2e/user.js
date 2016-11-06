import HTTPStatus from 'http-status';
import UserModel from 'business-chat-backend/model/User';
import app from 'business-chat-backend/tests/app';
import expect from 'business-chat-backend/tests/expect';
import faker from 'faker';
import request from 'supertest-as-promised';

const createDefaultUserModel = () => new UserModel();

describe('User API', () => {
  beforeEach('recreate database', () => {
    const userModel = createDefaultUserModel();
    const newDatabaseName = `test-${faker.random.uuid()}`;

    return userModel.createDatabase(newDatabaseName)
      .then(() => userModel.createCollection());
  });

  describe('save', () => {
    it('saves object when it is valid', () => {
      const user = {
        username: 'foo',
      };

      return request(app)
        .post('/user/')
        .send(user)
        .expect(HTTPStatus.CREATED)
        .expect(({ body }) => {
          expect(body).to.contain.key('id');
          expect(body).to.containSubset(user);
        });
    });

    it('returns bad request status when it is not valid', () => {
      const user = {
      };

      return request(app)
        .post('/user/')
        .send(user)
        .expect(HTTPStatus.BAD_REQUEST)
        .expect(({ body }) => expect(body).to.be.empty());
    });
  });

  describe('get', () => {
    it('gets object when it exists', () => {
      const user = {
        username: 'foo',
      };

      return request(app)
        .post('/user/')
        .send(user)
        .then(({ body: postBody }) => {
          const id = postBody.id;

          return request(app)
            .get(`/user/${id}`)
            .expect(HTTPStatus.OK)
            .expect(({ body }) => expect(body).to.deep.equal(Object.assign({}, user, { id })));
        });
    });

    it('returns not found status when it does not exist', () => {
      const id = 'non-existent-id';

      return request(app)
        .get(`/user/${id}`)
        .expect(HTTPStatus.NOT_FOUND)
        .expect(({ body }) => expect(body).to.be.empty());
    });
  });
});
