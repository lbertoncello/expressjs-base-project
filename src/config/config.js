import _ from 'lodash';
import __dirname from '../utils/dirname.js';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env' });

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

const baseConfig = {
  env,
  isDev: env === 'development',
  port,
}

let envConfig = {};

switch (env) {
  case 'dev':
  case 'development':
    const devConfig = await import('./dev.js');

    envConfig = devConfig.config;
    break;

  case 'prod':
  case 'production':
    const prodConfig = await import('./prod.js');

    envConfig = prodConfig.config;
    break;

  default:
    const defaultConfig = await import('./dev.js');

    envConfig = defaultConfig.config;
}

export default _.merge(baseConfig, envConfig);