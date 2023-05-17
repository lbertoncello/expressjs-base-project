import express from 'express';
import loaders from './loaders/loaders.js';
import envConfig from './config/env/env.js';

export const app = express();

export const start = async () => {
  try {
    await loaders({ app, express });
    app.listen(envConfig.port, () => {
      console.log(`API running on http://localhost:${envConfig.port}/api/v1`);
      console.log(envConfig.dbUrl);
    });
  } catch (err) {
    console.error(err);
    console.log('It was not possible to initialize the server');
  }
};
