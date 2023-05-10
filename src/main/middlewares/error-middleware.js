import ApplicationError from '../../presentation/errors/application-error.js';
import ApplicationErrorResponse from '../../presentation/responses/application-error-response.js';

export default (err, req, res, next) => {
  console.error(err);
  let message = err.message || 'Servor error';
  let status = err.status || 500;

  // mongoose duplicate error
  if (err.code === 11000) {
    message = 'The field already exists or a duplicate value has been found.';
    status = 400;
  }

  // mongoose cast error
  if (err.name === 'CastError') {
    message = 'Invalid parameter passed';
    status = 400;
  }

  // mongoose validaion error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map((val) => val.message);
    status = 400;
  }

  const error = new ApplicationError(message, status);

  res.status(error.status).json(new ApplicationErrorResponse(error.status, error.message).body);
};
