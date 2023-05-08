import dbLoader from './db-loader.js';
import expressLoader from './express-loader.js';

export default async ({ app, express }) => {
  try {
    await dbLoader();
    console.log('MongoDB has been initialized...');

    expressLoader({ app, express });
    console.log('Express has been initialized...');
  } catch (err) {
    console.error('Error during server initialization');
    throw err;
  }
};
