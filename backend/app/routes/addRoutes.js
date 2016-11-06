import bodyParser from 'body-parser';
import userRoutes from 'business-chat-backend/routes/user';

export default (app) => {
  app.use(bodyParser.json());
  app.use('/user', userRoutes);
};
