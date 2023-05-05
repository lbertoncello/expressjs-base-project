import mongoose from 'mongoose';
import dotenv from 'dotenv';
import options from '../config/config.js';

export default async (url = options.dbUrl, opts = {}) => {
  try {
    const dbOptions = { ...opts, useNewUrlParser: true, useUnifiedTopology: true };
    await mongoose.connect(url, dbOptions);
    const connection = mongoose.connection;
  
    return connection;
  } catch (err) {
    console.error('DB Error: ', err);
  }
}