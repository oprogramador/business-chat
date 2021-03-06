import arangojs from 'arangojs';
import bunyan from 'bunyan';
import config from 'business-chat-backend/config';
import packageInfo from '../package';
import urlFormatter from 'url';

const logger = bunyan.createLogger({ name: packageInfo.name });
const url = urlFormatter.format({
  auth: `${config.db.username}:${config.db.password}`,
  hostname: config.db.host,
  port: config.db.port,
  protocol: 'http',
});
const db = arangojs({
  databaseName: config.db.name,
  url,
});

export {
  db,
  logger,
};
