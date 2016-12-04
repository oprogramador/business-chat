import {
  Message,
  Room,
  Team,
  User,
} from 'business-chat-model';
import { SerializerFactory } from 'js-abstract-synchronizer';
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
