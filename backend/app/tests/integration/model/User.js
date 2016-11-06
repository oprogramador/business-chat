import UserModel from 'business-chat-backend/model/User';
import ValidationError from 'business-chat-backend/errors/ValidationError';
import _ from 'lodash';
import expect from 'business-chat-backend/tests/expect';
import faker from 'faker';

const createDefaultUserModel = () => new UserModel();

describe('UserModel', () => {
  beforeEach('recreate database', () => {
    const userModel = createDefaultUserModel();
    const newDatabaseName = `test-${faker.random.uuid()}`;

    return userModel.createDatabase(newDatabaseName)
      .then(() => userModel.createCollection());
  });

  describe('#save', () => {
    it('returns object with id', () => {
      const userModel = createDefaultUserModel();
      const user = {
        username: 'foo',
      };

      return userModel.save(user)
        .then((result) => {
          expect(result).to.contain.key('id');
          expect(_.omit(result, 'id')).to.deep.equal(user);
        });
    });

    it('does not modify provided object', () => {
      const userModel = createDefaultUserModel();
      const user = {
        username: 'foo',
      };
      const userCopy = _.cloneDeep(user);

      return userModel.save(user)
        .then(() => expect(user).to.deep.equal(userCopy));
    });
  });

  it('saves and retrieves object when it is valid', () => {
    const userModel = createDefaultUserModel();
    const user = {
      username: 'foo',
    };

    return userModel.save(user)
      .then(result => userModel.find(result.id))
      .then(result => expect(result).to.containSubset(user));
  });

  it('invalidates when authentication fails');
  it('invalidates when there are missing fields', () => {
    const userModel = createDefaultUserModel();
    const user = {
    };

    return expect(userModel.save(user)).to.be.rejectedWith(ValidationError);
  });

  it('invalidates when there are additional fields', () => {
    const userModel = createDefaultUserModel();
    const user = {
      foo: 'bar',
      username: 'foo',
    };

    return expect(userModel.save(user)).to.be.rejectedWith(ValidationError);
  });

  describe('#exists', () => {
    it('returns false when object does not exist', () => {
      const userModel = createDefaultUserModel();

      return expect(userModel.exists('nonExistentId')).to.eventually.be.false();
    });

    it('returns true when object exists', () => {
      const userModel = createDefaultUserModel();
      const user = {
        username: 'foo',
      };

      return expect(
        userModel.save(user)
          .then(result => userModel.exists(result.id))
      ).to.eventually.be.true();
    });
  });
});
