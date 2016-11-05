import TeamModel from 'business-chat-backend/model/Team';
import ValidationError from 'business-chat-backend/errors/ValidationError';
import _ from 'lodash';
import expect from 'business-chat-backend/tests/expect';
import faker from 'faker';

const createDefaultTeamModel = () => new TeamModel();

describe('TeamModel', () => {
  beforeEach('recreate database', () => {
    const teamModel = createDefaultTeamModel();
    const newDatabaseName = `test-${faker.random.uuid()}`;

    return teamModel.createDatabase(newDatabaseName)
      .then(() => teamModel.createCollection());
  });

  describe('#save', () => {
    it('returns object with id', () => {
      const teamModel = createDefaultTeamModel();
      const team = {
        name: 'foo',
      };

      return teamModel.save(team)
        .then((result) => {
          expect(result).to.contain.key('id');
          expect(_.omit(result, 'id')).to.deep.equal(team);
        });
    });

    it('does not modify provided object', () => {
      const teamModel = createDefaultTeamModel();
      const team = {
        name: 'foo',
      };
      const teamCopy = _.cloneDeep(team);

      return teamModel.save(team)
        .then(() => expect(team).to.deep.equal(teamCopy));
    });
  });

  it('saves and retrieves object when it is valid', () => {
    const teamModel = createDefaultTeamModel();
    const team = {
      name: 'foo',
    };

    return teamModel.save(team)
      .then(result => teamModel.find(result.id))
      .then(result => expect(result).to.containSubset(team));
  });

  it('invalidates when authentication fails');
  it('invalidates when there are missing fields', () => {
    const teamModel = createDefaultTeamModel();
    const team = {
    };

    return expect(teamModel.save(team)).to.be.rejectedWith(ValidationError);
  });

  it('invalidates when there are additional fields', () => {
    const teamModel = createDefaultTeamModel();
    const team = {
      foo: 'bar',
      name: 'foo',
    };

    return expect(teamModel.save(team)).to.be.rejectedWith(ValidationError);
  });

  describe('#exists', () => {
    it('returns false when object does not exist', () => {
      const teamModel = createDefaultTeamModel();

      return expect(teamModel.exists('nonExistentId')).to.eventually.be.false();
    });

    it('returns true when object exists', () => {
      const teamModel = createDefaultTeamModel();
      const team = {
        name: 'foo',
      };

      return expect(
        teamModel.save(team)
          .then(result => teamModel.exists(result.id))
      ).to.eventually.be.true();
    });
  });
});
