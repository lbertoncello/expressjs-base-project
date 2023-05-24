import AddGameController from '../../presentation/controllers/game/add-game.js';
import GetGameByIdController from '../../presentation/controllers/game/get-game-by-id.js';
import GetAllGamesController from '../../presentation/controllers/game/get-all-games.js';
import UpdateGameByIdController from '../../presentation/controllers/game/update-game-by-id.js';
import DeleteGameByIdController from '../../presentation/controllers/game/delete-game-by-id.js';
import AddGame from '../../use-cases/game/add-game.js';
import GetGame from '../../use-cases/game/get-game.js';
import GetAllGames from '../../use-cases/game/get-all-games.js';
import UpdateGame from '../../use-cases/game/update-game.js';
import DeleteGame from '../../use-cases/game/delete-game.js';
import GameDatabase from '../../data-access/database/game-database.js';
import GameRepository from '../../data-access/repositories/game-repository.js';

export const makeAddGameController = () => {
  const database = new GameDatabase();
  const repository = new GameRepository(database);
  const addGame = new AddGame(repository);
  const controller = new AddGameController(addGame);

  return controller;
};

export const makeGetGameByIdController = () => {
  const database = new GameDatabase();
  const repository = new GameRepository(database);
  const getGame = new GetGame(repository);
  const controller = new GetGameByIdController(getGame);

  return controller;
};

export const makeGetAllGamesController = () => {
  const database = new GameDatabase();
  const repository = new GameRepository(database);
  const getAllGames = new GetAllGames(repository);
  const controller = new GetAllGamesController(getAllGames);

  return controller;
};

export const makeUpdateGameByIdController = () => {
  const database = new GameDatabase();
  const repository = new GameRepository(database);
  const updateGame = new UpdateGame(repository);
  const controller = new UpdateGameByIdController(updateGame);

  return controller;
};

export const makeDeleteGameByIdController = () => {
  const database = new GameDatabase();
  const repository = new GameRepository(database);
  const deleteGame = new DeleteGame(repository);
  const controller = new DeleteGameByIdController(deleteGame);

  return controller;
};
