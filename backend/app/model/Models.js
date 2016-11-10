import { ERROR_ARANGO_DUPLICATE_NAME } from 'arangodb-error-codes';
import MessageModel from 'business-chat-backend/model/Message';
import RoomModel from 'business-chat-backend/model/Room';
import TeamModel from 'business-chat-backend/model/Team';
import UserModel from 'business-chat-backend/model/User';

const teamModel = new TeamModel();
const roomModel = new RoomModel({
  validateTeamId: id => teamModel.exists(id).then(result => (result ? Promise.resolve() : Promise.reject())),
});
const userModel = new UserModel();
const messageModel = new MessageModel({
  validateRoomId: id => roomModel.exists(id).then(result => (result ? Promise.resolve() : Promise.reject())),
  validateSenderId: id => userModel.exists(id).then(result => (result ? Promise.resolve() : Promise.reject())),
});
const configureDatabase = databaseName => messageModel.createDatabase(databaseName)
  .then(() => Promise.all([
    messageModel.createCollection(),
    roomModel.createCollection(),
    teamModel.createCollection(),
    userModel.createCollection(),
  ]))
  .catch(error => (error.errorNum === ERROR_ARANGO_DUPLICATE_NAME ? Promise.resolve() : Promise.reject(error)));

export default {
  configureDatabase,
  messageModel,
  roomModel,
  teamModel,
  userModel,
};
