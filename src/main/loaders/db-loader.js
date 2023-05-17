import mongoose from 'mongoose';
import envConfig from '../config/env/env.js';

export default async (url = envConfig.dbUrl, opts = {}) => {
  try {
    const dbOptions = { ...opts, useNewUrlParser: true, useUnifiedTopology: true };
    await mongoose.connect(url, dbOptions);
    const connection = mongoose.connection;

    return connection;
  } catch (err) {
    console.error('DB initialization ERROR');
    throw err;
  }
};
