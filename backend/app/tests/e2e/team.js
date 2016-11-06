import HTTPStatus from 'http-status';
import TeamModel from 'business-chat-backend/model/Team';
import app from 'business-chat-backend/tests/app';
import expect from 'business-chat-backend/tests/expect';
import faker from 'faker';
import request from 'supertest-as-promised';

describe('Team API', () => {
  beforeEach('recreate database', () => {
    const teamModel = new TeamModel();
    const newDatabaseName = `test-${faker.random.uuid()}`;

    return teamModel.createDatabase(newDatabaseName)
      .then(() => teamModel.createCollection());
  });

  describe('save', () => {
    it('saves object when it is valid', () => {
      const team = {
        name: 'foo',
      };

      return request(app)
        .post('/team/')
        .send(team)
        .expect(HTTPStatus.CREATED)
        .expect(({ body }) => {
          expect(body).to.contain.key('id');
          expect(body).to.containSubset(team);
        });
    });

    it('returns bad request status when it is not valid', () => {
      const team = {
      };

      return request(app)
        .post('/team/')
        .send(team)
        .expect(HTTPStatus.BAD_REQUEST)
        .expect(({ body }) => expect(body).to.be.empty());
    });
  });

  describe('get', () => {
    it('gets object when it exists', () => {
      const team = {
        name: 'foo',
      };

      return request(app)
        .post('/team/')
        .send(team)
        .then(({ body: postBody }) => {
          const id = postBody.id;

          return request(app)
            .get(`/team/${id}`)
            .expect(HTTPStatus.OK)
            .expect(({ body }) => expect(body).to.deep.equal(Object.assign({}, team, { id })));
        });
    });

    it('returns not found status when it does not exist', () => {
      const id = 'non-existent-id';

      return request(app)
        .get(`/team/${id}`)
        .expect(HTTPStatus.NOT_FOUND)
        .expect(({ body }) => expect(body).to.be.empty());
    });
  });
});
