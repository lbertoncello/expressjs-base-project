import setupMiddleware from '../config/setup-middlewares.js';
import setupRoutes from '../config/setup-routes.js';
import logger from '../config/logger/logger.js';

export default (app) => {
  try {
    app.disable('x-powered-by');
    // Add middlwares to improve security
    app.enable('trust proxy');

    setupMiddleware(app);
    setupRoutes(app);

    return app;
  } catch (err) {
    logger.error('Express initialization ERROR');
    throw err;
  }
};
