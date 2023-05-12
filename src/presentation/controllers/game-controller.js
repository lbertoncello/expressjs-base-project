import AddGame from '../../use-cases/game/add-game.js';
import SuccessResponse from '../responses/success-response.js';
import InvalidParamError from '../errors/invalid-param-error.js';
import GetAllGamesUseCase from '../../use-cases/game/get-all-games.js';

export default class GameController {
  constructor(repository) {
    this.repository = repository;
  }

  async addGame(req) {
    const { title, rating, summary } = req.body;
    if (!(title && rating && summary)) {
      throw new InvalidParamError('Not all parameters were informed');
    }

    const addGameUseCase = new AddGame(this.repository);
    const result = await addGameUseCase.execute(title, rating, summary);

    return new SuccessResponse(result);
  }

  async getAllGames(req) {
    const getAllGamesUseCase = new GetAllGamesUseCase(this.repository);
    const games = await getAllGamesUseCase.execute();

    return new SuccessResponse(games);
  }
}
