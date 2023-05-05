import express from 'express';
import loaders from '../loaders/loaders.js';
import config from '../config/config.js';

console.log('config: ', config)


export const app = express();

export const start = async () => {
  try {
    await loaders({ app, express });
    app.listen(config.port, () => {
      console.log(`API running on http://localhost:${config.port}/api/v1`);
      console.log(process.env.MONGO_URI_DEV);
      console.log(config.dbUrl);
    })
  } catch (err) {
    console.error(err);
  }
}