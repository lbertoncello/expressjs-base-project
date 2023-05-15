import AuthController from '../../presentation/controllers/auth-controller.js';
import UserDatabase from '../../data-access/database/user-database.js';
import UserRepository from '../../data-access/repositories/user-repository.js';
import BcryptAdapter from '../../data-access/auth/bcrypt-adapter.js';
import JwtAdapter from '../../data-access/auth/jwt-adapter.js';
import config from '../config/config.js';

export const makeAuthController = () => {
  const database = new UserDatabase();
  const repository = new UserRepository(database);
  const bcryptAdapter = new BcryptAdapter();
  const jwtAdapter = new JwtAdapter(config.secrets.jwt, config.secrets.jwtExp);
  const controller = new AuthController(repository, bcryptAdapter, jwtAdapter);

  return controller;
};