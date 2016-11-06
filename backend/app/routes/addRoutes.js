import bodyParser from 'body-parser';
import teamRoutes from 'business-chat-backend/routes/team';
import userRoutes from 'business-chat-backend/routes/user';

export default (app) => {
  app.use(bodyParser.json());
  app.use('/team', teamRoutes);
  app.use('/user', userRoutes);
};
