import UserController from '../../presentation/controllers/user-controller.js';
import UserDatabase from '../../data-access/database/user-database.js';
import UserRepository from '../../entities/repositories/user-repository.js';
import BcryptAdapter from '../../data-access/cripto/bcrypt-adapter.js';

export const makeUserController = () => {
  // TODO get salt from env
  const salt = 12;
  const database = new UserDatabase();
  const repository = new UserRepository(database);
  const bcryptAdapter = new BcryptAdapter(salt);
  const controller = new UserController(repository, bcryptAdapter);

  return controller;
};
