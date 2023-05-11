import UserController from '../../presentation/controllers/user-controller.js';
import UserDatabase from '../../data-access/database/user-database.js';
import UserRepository from '../../data-access/repositories/user-repository.js';
import BcryptAdapter from '../../data-access/crypto/bcrypt-adapter.js';

export const makeUserController = () => {
  const database = new UserDatabase();
  const repository = new UserRepository(database);
  const bcryptAdapter = new BcryptAdapter();
  const controller = new UserController(repository, bcryptAdapter);

  return controller;
};
