import ExpressBunyanLogger from 'express-bunyan-logger';
import config from 'business-chat-backend/config';
import createApp from 'business-chat-backend/routes/createApp';
import { logger } from 'business-chat-backend/servicesManager';

const port = config.http.port;

export default createApp({
  dbName: config.db.name,
  loggerMiddleware: ExpressBunyanLogger(),
  port,
})
  .then(() => logger.info(`Running on http://localhost:${port}`));
