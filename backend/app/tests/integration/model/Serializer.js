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

  it('saves and reloads object when it is valid', () => {
    const serializer = new Serializer();
    const object = {
      name: 'John',
      surname: 'Smith',
    };

    const serializableObject = serializer.create(object);

    return serializableObject.save()
      .then(() => serializableObject.reload())
      .then(() => {
        expect(serializableObject.getInnerObject()).to.contain.key('id');
        expect(serializableObject.getInnerObject()).to.containSubset(serializableObject);
      });
  });

  it('reloads object when someone else has changed it', () => {
    const serializer = new Serializer();
    const object = {
      id: 'foo',
      name: 'John',
      surname: 'Smith',
    };

    const serializableObject = serializer.create(object);
    const anotherSerializableObject = serializer.create(object);

    return serializableObject.save()
      .then(() => {
        anotherSerializableObject.setField('name', 'Vanessa');

        return anotherSerializableObject.save();
      })
      .then(() => serializableObject.reload())
      .then(() => {
        expect(serializableObject.getInnerObject()).to.containSubset({
          id: 'foo',
          name: 'Vanessa',
          surname: 'Smith',
        });
      });
  });

  it('requires security token');
});
