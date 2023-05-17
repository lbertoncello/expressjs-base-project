import { start } from './server.js';
import logger from './config/logger/logger.js';

start();

process.on('unhandledRejection', (err, _) => {
  logger.error(`SERVER ERROR: ${err}`);
});
