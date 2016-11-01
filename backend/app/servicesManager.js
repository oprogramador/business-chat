import bunyan from 'bunyan';

const packageInfo = require('../package');
const logger = bunyan.createLogger({ name: packageInfo.name });

export {
  logger,
};
