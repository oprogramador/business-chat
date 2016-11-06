import CommonModel from 'business-chat-backend/model/CommonModel';
import NonExistentForeignKeyError from 'business-chat-backend/errors/NonExistentForeignKeyError';
import ParameterError from 'business-chat-backend/errors/ParameterError';
import ValidationError from 'business-chat-backend/errors/ValidationError';
import _ from 'lodash';
import expect from 'business-chat-backend/tests/expect';
import faker from 'faker';
import inputSchema from './data/exampleInputSchema';
import outputSchema from './data/exampleOutputSchema';

const collectionName = 'exampleCollection';

const createDefaultModel = () => new CommonModel({
  collectionName,
  inputSchema,
  outputSchema,
  validators: {
    key1: value => (value === 'existentValue1' ? Promise.resolve() : Promise.reject()),
    key2: value => (value === 'existentValue2' ? Promise.resolve() : Promise.reject()),
  },
});

describe('CommonModel', () => {
  beforeEach('recreate database', () => {
    const commonModel = createDefaultModel();
    const newDatabaseName = `test-${faker.random.uuid()}`;

    return commonModel.createDatabase(newDatabaseName)
      .then(() => commonModel.createCollection());
  });

  describe('#save', () => {
    it('returns object with id', () => {
      const commonModel = createDefaultModel();
      const object = {
        key1: 'existentValue1',
        key2: 'existentValue2',
        key3: 'foo',
      };

      return commonModel.save(object)
        .then((result) => {
          expect(result).to.contain.key('id');
          expect(_.omit(result, 'id')).to.deep.equal(object);
        });
    });

    it('does not modify provided object', () => {
      const commonModel = createDefaultModel();
      const object = {
        key1: 'existentValue1',
        key2: 'existentValue2',
        key3: 'foo',
      };
      const objectCopy = _.cloneDeep(object);

      return commonModel.save(object)
        .then(() => expect(object).to.deep.equal(objectCopy));
    });
  });

  it('saves and retrieves object when it is valid', () => {
    const commonModel = createDefaultModel();
    const object = {
      key1: 'existentValue1',
      key2: 'existentValue2',
      key3: 'foo',
    };

    return commonModel.save(object)
      .then(result => commonModel.find(result.id))
      .then(result => expect(result).to.containSubset(object));
  });

  it('invalidates when authentication fails');
  it('invalidates when there are missing fields', () => {
    const commonModel = createDefaultModel();
    const object = {
      key1: 'existentValue1',
      key3: 'foo',
    };

    return expect(commonModel.save(object)).to.be.rejectedWith(ValidationError);
  });

  it('invalidates when there are additional fields', () => {
    const commonModel = createDefaultModel();
    const object = {
      foo: 'bar',
      key1: 'existentValue1',
      key2: 'existentValue2',
      key3: 'foo',
    };

    return expect(commonModel.save(object)).to.be.rejectedWith(ValidationError);
  });

  it('invalidates when validator invalidates', () => {
    const commonModel = createDefaultModel();
    const object = {
      key1: 'nonExistentValue1',
      key2: 'existentValue2',
      key3: 'foo',
    };

    return expect(commonModel.save(object)).to.be.rejectedWith(NonExistentForeignKeyError);
  });

  it('returns right error when provided validator invalidates', () => {
    const commonModel = createDefaultModel();
    const object = {
      key1: 'nonExistentValue1',
      key2: 'existentValue2',
      key3: 'foo',
    };

    return commonModel.save(object)
      .catch((error) => {
        expect(error.getKey()).to.equal('key1');
        expect(error.getValue()).to.equal('nonExistentValue1');
      });
  });

  describe('#exists', () => {
    it('returns false when object does not exist', () => {
      const commonModel = createDefaultModel();

      return expect(commonModel.exists('nonExistentId')).to.eventually.be.false();
    });

    it('returns true when object exists', () => {
      const commonModel = createDefaultModel();
      const object = {
        key1: 'existentValue1',
        key2: 'existentValue2',
        key3: 'foo',
      };

      return expect(
        commonModel.save(object)
          .then(result => commonModel.exists(result.id))
      ).to.eventually.be.true();
    });
  });

  describe('#find', () => {
    it('returns all required fields without additional ones', () => {
      const commonModel = createDefaultModel();
      const object = {
        key1: 'existentValue1',
        key2: 'existentValue2',
        key3: 'foo',
      };

      return commonModel.save(object)
        .then(result => commonModel.find(result.id))
        .then(result => expect(result).to.have.keys('id', 'key1', 'key2', 'key3'));
    });
  });

  describe('#constructor', () => {
    it('throws ParameterError when provided collectionName is not a string', () => {
      const createCommonModel = () => new CommonModel({
        collectionName: [],
        inputSchema,
        outputSchema,
      });

      expect(createCommonModel).to.throw(ParameterError);
      try {
        createCommonModel();
      } catch (error) {
        expect(error.getParameterName()).to.equal('collectionName');
      }
    });

    it('throws ParameterError when provided inputSchema is undefined', () => {
      const createCommonModel = () => new CommonModel({
        collectionName: 'foo',
        outputSchema,
      });

      expect(createCommonModel).to.throw(ParameterError);
      try {
        createCommonModel();
      } catch (error) {
        expect(error.getParameterName()).to.equal('inputSchema');
      }
    });

    it('throws ParameterError when provided outputSchema is undefined', () => {
      const createCommonModel = () => new CommonModel({
        collectionName: 'foo',
        inputSchema,
      });

      expect(createCommonModel).to.throw(ParameterError);
      try {
        createCommonModel();
      } catch (error) {
        expect(error.getParameterName()).to.equal('outputSchema');
      }
    });
  });
});
