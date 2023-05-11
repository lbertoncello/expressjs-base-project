import GameController from '../../presentation/controllers/game-controller.js';
import GameDatabase from '../../data-access/database/game-database.js';
import GameRepository from '../../data-access/repositories/game-repository.js';

export const makeGameController = () => {
  const database = new GameDatabase();
  const repository = new GameRepository(database);
  const controller = new GameController(repository);

  return controller;
};
