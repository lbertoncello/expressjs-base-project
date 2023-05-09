import ApplicationError from '../../presentation/errors/application-error.js';
import ErrorResponse from '../../presentation/responses/error-response.js';

export default (err, req, res, next) => {
  console.error(err);
  let error = { ...err };
  let message = null;
  let status = err.status;

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

  error = new ApplicationError(message, status);

  res.status(error.status || 500).json(new ErrorResponse(error.message || 'Servor error'));
};
