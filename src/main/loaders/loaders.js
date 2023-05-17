import dbLoader from './db-loader.js';
import expressLoader from './express-loader.js';
import logger from '../config/logger/logger.js';

export default async ({ app, express }) => {
  try {
    await dbLoader();
    logger.info('MongoDB has been initialized...');

    expressLoader({ app, express });
    logger.info('Express has been initialized...');
  } catch (err) {
    logger.error('Error during server initialization');
    throw err;
  }
};
