import { configureDatabase, messageModel, roomModel, teamModel, userModel } from 'business-chat-backend/model/Models';
import NonExistentForeignKeyError from 'business-chat-backend/errors/NonExistentForeignKeyError';
import expect from 'business-chat-backend/tests/expect';
import faker from 'faker';

describe('Models', () => {
  beforeEach('recreate database', () => {
    const newDatabaseName = `test-${faker.random.uuid()}`;

    return configureDatabase(newDatabaseName);
  });

  describe('roomModel - teamId', () => {
    it('saves room with existent team id', () => {
      const team = {
        name: 'foo',
      };
      const room = {
        name: 'bar',
      };

      return teamModel.save(team)
        .then(result => roomModel.save(Object.assign(room, { teamId: result.id })))
        .then(result => roomModel.find(result.id))
        .then(result => expect(result).to.containSubset(room));
    });

    it('invalidates when provided team id does not exist', () => {
      const room = {
        name: 'foo',
        teamId: 'nonExistentTeamId',
      };

      return expect(roomModel.save(room)).to.be.rejectedWith(NonExistentForeignKeyError);
    });
  });

  describe('messageModel - roomId', () => {
    it('saves message with existent room id and sender id', () => {
      const team = {
        name: 'foo',
      };
      const room = {
        name: 'bar',
      };
      const sender = {
        username: 'Johny',
      };
      const message = {
        text: 'lorem ipsum',
      };

      let roomId, senderId;

      return teamModel.save(team)
        .then(result => roomModel.save(Object.assign(room, { teamId: result.id })))
        .then((result) => {
          roomId = result.id;
        })
        .then(() => userModel.save(sender))
        .then((result) => {
          senderId = result.id;
        })
        .then(() => messageModel.save(Object.assign(message, { roomId, senderId })))
        .then(result => messageModel.find(result.id))
        .then(result => expect(result).to.containSubset(message));
    });

    it('invalidates when provided room id and sender id do not exist', () => {
      const message = {
        roomId: 'nonExistentRoomId',
        senderId: 'nonExistentSenderId',
        text: 'lorem ipsum',
      };

      return expect(messageModel.save(message)).to.be.rejectedWith(NonExistentForeignKeyError);
    });

    it('invalidates when provided room id does not exist', () => {
      const sender = {
        username: 'Johny',
      };
      const message = {
        roomId: 'nonExistentRoomId',
        text: 'lorem ipsum',
      };

      return expect(
        userModel.save(sender)
          .then(result => messageModel.save(Object.assign(message, { senderId: result.id })))
      ).to.be.rejectedWith(NonExistentForeignKeyError);
    });

    it('invalidates when provided sender id does not exist', () => {
      const team = {
        name: 'foo',
      };
      const room = {
        name: 'bar',
      };
      const message = {
        senderId: 'nonExistentSenderId',
        text: 'lorem ipsum',
      };

      return expect(
        teamModel.save(team)
          .then(result => roomModel.save(Object.assign(room, { teamId: result.id })))
          .then(result => messageModel.save(Object.assign(message, { roomId: result.id })))
      ).to.be.rejectedWith(NonExistentForeignKeyError);
    });
  });
});
