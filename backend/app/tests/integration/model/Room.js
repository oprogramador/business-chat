import NonExistentForeignKeyError from 'business-chat-backend/errors/NonExistentForeignKeyError';
import RoomModel from 'business-chat-backend/model/Room';
import ValidationError from 'business-chat-backend/errors/ValidationError';
import _ from 'lodash';
import expect from 'business-chat-backend/tests/expect';
import faker from 'faker';

const createDefaultRoomModel = () => new RoomModel({
  validateTeamId: teamId => (teamId === 'existentTeamId' ? Promise.resolve() : Promise.reject()),
});

describe('RoomModel', () => {
  beforeEach('recreate database', () => {
    const roomModel = createDefaultRoomModel();
    const newDatabaseName = `test-${faker.random.uuid()}`;

    return roomModel.createDatabase(newDatabaseName)
      .then(() => roomModel.createCollection());
  });

  describe('#save', () => {
    it('returns object with id', () => {
      const roomModel = createDefaultRoomModel();
      const room = {
        name: 'foo',
        teamId: 'existentTeamId',
      };

      return roomModel.save(room)
        .then((result) => {
          expect(result).to.contain.key('id');
          expect(_.omit(result, 'id')).to.deep.equal(room);
        });
    });

    it('does not modify provided object', () => {
      const roomModel = createDefaultRoomModel();
      const room = {
        name: 'foo',
        teamId: 'existentTeamId',
      };
      const roomCopy = _.cloneDeep(room);

      return roomModel.save(room)
        .then(() => expect(room).to.deep.equal(roomCopy));
    });
  });

  it('saves and retrieves object when it is valid', () => {
    const roomModel = createDefaultRoomModel();
    const room = {
      name: 'foo',
      teamId: 'existentTeamId',
    };

    return roomModel.save(room)
      .then(result => roomModel.find(result.id))
      .then(result => expect(result).to.containSubset(room));
  });

  it('invalidates when authentication fails');
  it('invalidates when there are missing fields', () => {
    const roomModel = createDefaultRoomModel();
    const room = {
      teamId: 'existentTeamId',
    };

    return expect(roomModel.save(room)).to.be.rejectedWith(ValidationError);
  });

  it('invalidates when there are additional fields', () => {
    const roomModel = createDefaultRoomModel();
    const room = {
      foo: 'bar',
      name: 'foo',
      teamId: 'existentTeamId',
    };

    return expect(roomModel.save(room)).to.be.rejectedWith(ValidationError);
  });

  it('invalidates when provided team id does not exist', () => {
    const roomModel = createDefaultRoomModel();
    const room = {
      name: 'foo',
      teamId: 'nonExistentTeamId',
    };

    return expect(roomModel.save(room)).to.be.rejectedWith(NonExistentForeignKeyError);
  });

  it('returns right error when provided team id does not exist', () => {
    const roomModel = createDefaultRoomModel();
    const room = {
      name: 'foo',
      teamId: 'nonExistentTeamId',
    };

    return roomModel.save(room)
      .catch((error) => {
        expect(error.getKey()).to.equal('teamId');
        expect(error.getValue()).to.equal('nonExistentTeamId');
      });
  });

  describe('#exists', () => {
    it('returns false when object does not exist', () => {
      const roomModel = createDefaultRoomModel();

      return expect(roomModel.exists('nonExistentId')).to.eventually.be.false();
    });

    it('returns true when object exists', () => {
      const roomModel = createDefaultRoomModel();
      const room = {
        name: 'foo',
        teamId: 'existentTeamId',
      };

      return expect(
        roomModel.save(room)
          .then(result => roomModel.exists(result.id))
      ).to.eventually.be.true();
    });
  });
});
