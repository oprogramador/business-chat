import { Room, Team, User } from 'business-chat-model';
import serializer from 'business-chat-backend/services/serializer';

export default () => {
  const alicia = serializer.create(Object.assign(new User({ username: 'Alicia' }), { id: 'alicia' }));
  const bob = serializer.create(Object.assign(new User({ username: 'Bob' }), { id: 'bob' }));
  const room = serializer.create(Object.assign(new Room({ name: 'default' }), { id: 'default-room' }));
  const team = serializer.create(Object.assign(new Team({ name: 'default' }), { id: 'default-team' }));

  room.addUser(alicia);
  room.addUser(bob);
  team.addRoom(room);

  return team.save();
};
