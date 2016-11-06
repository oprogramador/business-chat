import MessageModel from 'business-chat-backend/model/Message';
import RoomModel from 'business-chat-backend/model/Room';
import TeamModel from 'business-chat-backend/model/Team';

const teamModel = new TeamModel();
const roomModel = new RoomModel({
  validateTeamId: id => teamModel.exists(id).then(result => (result ? Promise.resolve() : Promise.reject())),
});
const messageModel = new MessageModel({
  validateRoomId: id => roomModel.exists(id).then(result => (result ? Promise.resolve() : Promise.reject())),
});
const configureDatabase = databaseName => messageModel.createDatabase(databaseName)
  .then(() => Promise.all([
    messageModel.createCollection(),
    roomModel.createCollection(),
    teamModel.createCollection(),
  ]));

export default {
  configureDatabase,
  messageModel,
  roomModel,
  teamModel,
};
