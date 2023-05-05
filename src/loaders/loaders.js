import dbLoader from './db-loader.js';
import expressLoader from './express-loader.js';

export default async ({ app, express }) => {
  const connection = await dbLoader();
  // TODO handle mongoose connection error
  console.log('MongoDB has been initialized...');

  expressLoader({ app, express });
  console.log('Express has been initialized...');
}