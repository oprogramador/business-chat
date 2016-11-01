import arangojs from 'arangojs';
import bunyan from 'bunyan';
import config from 'config';
import packageInfo from '../package';
import url from 'url';

const logger = bunyan.createLogger({ name: packageInfo.name });
const db = arangojs({
  url: url.format({
    auth: `${config.db.user}:${config.db.password}`,
    hostname: config.db.host,
    port: config.db.port,
    protocol: 'http',
  }),
});

export {
  db,
  logger,
};
