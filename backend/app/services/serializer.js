import Message from 'business-chat-backend/model/Message';
import Room from 'business-chat-backend/model/Room';
import SerializerFactory from 'js-abstract-synchronizer';
import Team from 'business-chat-backend/model/Team';
import User from 'business-chat-backend/model/User';
import { db } from 'business-chat-backend/servicesManager';

const serializer = SerializerFactory.create({
  implementationName: 'ArangoSerializer',
  implementationParams: {
    db,
  },
  prototypes: {
    Message: Message.prototype,
    Room: Room.prototype,
    Team: Team.prototype,
    User: User.prototype,
  },
});

export default serializer;
