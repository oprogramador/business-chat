import Serializer from 'business-chat-backend/model/Serializer';
import expect from 'business-chat-backend/tests/expect';
import faker from 'faker';

describe('Serializer', () => {
  beforeEach('recreate database', () => {
    const serializer = new Serializer();
    const newDatabaseName = `test-${faker.random.uuid()}`;

    return serializer.createDatabase(newDatabaseName)
      .then(() => serializer.createCollection());
  });

  it('saves and retrieves object when it is valid', () => {
    const serializer = new Serializer();
    const object = {
      name: 'John',
      surname: 'Smith',
    };

    const serializableObject = serializer.create(object);

    return serializableObject.save()
      .then(() => serializableObject.reload())
      .then((result) => {
        expect(result).to.contain.key('id');
        expect(result).to.containSubset(serializableObject);
      });
  });

  it('requires security token');
});
