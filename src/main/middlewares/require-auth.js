import AuthRequiredError from '../../presentation/errors/auth-required-error.js';
import JwtAdapter from '../../data-access/auth/jwt-adapter.js';
import config from '../config/config.js';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(' ')[1] : null;
  if (!token) next(new AuthRequiredError());

  const jwt = new JwtAdapter(config.secrets.jwt, config.secrets.jwtExp);
  const decoded = await jwt.verify(token);
  if (!decoded) next(new AuthRequiredError('Failed to authenticate'));

  req.authUser = decoded;
  next();
};
