import UserController from '../../presentation/controllers/user-controller.js';
import UserDatabase from '../../data-access/database/user-database.js';
import UserRepository from '../../data-access/repositories/user-repository.js';

export const makeUserController = () => {
  const database = new UserDatabase();
  const repository = new UserRepository(database);
  const controller = new UserController(repository);

  return controller;
};
