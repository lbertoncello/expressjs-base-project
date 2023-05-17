import express from 'express';
import loaders from './loaders/loaders.js';
import envConfig from './config/env/env.js';
import logger from './config/logger/logger.js';

export const app = express();

export const start = async () => {
  try {
    await loaders({ app, express });
    app.listen(envConfig.port, () => {
      logger.info(`API running on http://localhost:${envConfig.port}/api/v1`);
      logger.info(envConfig.dbUrl);
    });
  } catch (err) {
    logger.error(err);
    logger.info('It was not possible to initialize the server');
  }
};
