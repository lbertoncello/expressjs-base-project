import express from 'express';
import loaders from './loaders/loaders.js';
import config from './config/config.js';

export const app = express();

export const start = async () => {
  try {
    await loaders({ app, express });
    app.listen(config.port, () => {
      console.log(`API running on http://localhost:${config.port}/api/v1`);
      console.log(config.dbUrl);
    });
  } catch (err) {
    console.error(err);
    console.log('It was not possible to initialize the server');
  }
};
