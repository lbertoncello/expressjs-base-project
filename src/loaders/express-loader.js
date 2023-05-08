import morgan from "morgan";
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
import cors from 'cors';

import config from '../config/config.js';
import routes from '../routes/routes.js';

const apiLimiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 20 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (_request, res, _next) => res.status(429).json({
      status: false,
      message: "Too many requests, please try again later."
  }),
})

export default ({ app, express }) => {
  try {
    app.disable('x-powered-by');

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  
    // Dev logging middleware
    if (config.isDev) {
      app.use(morgan('dev'));
    }
  
    // Add middlwares to improve security
    app.enable('trust proxy');
  
    app.use(cors());
    app.use(mongoSanitize());
    // Add security headers
    app.use(helmet());
    app.use(xss());
  
    app.get('/ip', (req, res) => res.send(req.ip));
    app.use('/api/v1', apiLimiter, routes);
  
    // Error 404 handler
    app.use((req, res, next) => next(new Error('Route not found')));
  
    return app;
  } catch (err) {
    console.error('Express initialization ERROR');
    throw err;
  }
}