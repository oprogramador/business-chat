import { User } from 'business-chat-model';
import expect from 'business-chat-backend/tests/expect';
import faker from 'faker';
import serializer from 'business-chat-backend/services/serializer';

describe('model', () => {
  beforeEach('recreate database', () => {
    const dbName = `test-${faker.random.uuid()}`;

    return serializer.configure(dbName);
  });

  it('correctly saves data', () => {
    const alicia = serializer.create(new User({ username: 'Alicia' }));
    const newAlicia = serializer.create({ id: alicia.getId() });

    return alicia.save()
      .then(() => expect(alicia.getUsername()).to.equal('Alicia'))
      .then(() => newAlicia.reload())
      .then(() => expect(newAlicia.getUsername()).to.equal('Alicia'));
  });
});
