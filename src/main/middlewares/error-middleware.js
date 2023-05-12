import ApplicationErrorResponse from '../../presentation/responses/application-error-response.js';
import ServerErrorResponse from '../../presentation/responses/server-error-response.js';

export default (err, req, res, next) => {
  if (err.status && err.status !== 500 && err.message) {
    const message = `${err.name}: ${err.message}`;

    res.status(err.status).json(new ApplicationErrorResponse(err.status, message).body);
  } else {
    res.status(500).json(new ServerErrorResponse().body);
  }
};
