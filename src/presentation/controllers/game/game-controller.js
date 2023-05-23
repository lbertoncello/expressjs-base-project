import AddGame from '../../../use-cases/game/add-game.js';
import SuccessResponse from '../../responses/success-response.js';
import InvalidParamError from '../../errors/invalid-param-error.js';
import MissingParamError from '../../errors/missing-param-error.js';
import ClientError from '../../errors/client-error.js';
import GetGameUseCase from '../../../use-cases/game/get-game.js';
import GetAllGamesUseCase from '../../../use-cases/game/get-all-games.js';
import DeleteGameUseCase from '../../../use-cases/game/delete-game.js';
import UpdateGameUseCase from '../../../use-cases/game/update-game.js';

export default class GameController {
  constructor(repository) {
    this.repository = repository;
  }

  async addGame(req) {
    const requiredFielsd = ['title', 'rating', 'summary'];
    for (const requiredField of requiredFielsd) {
      if (!req.body[requiredField]) {
        throw new MissingParamError(requiredField);
      }
    }

    const { title, rating, summary } = req.body;
    const addGameUseCase = new AddGame(this.repository);
    const result = await addGameUseCase.execute(title, rating, summary);

    return new SuccessResponse(result);
  }

  async getAllGames(req) {
    const getAllGamesUseCase = new GetAllGamesUseCase(this.repository);
    const games = await getAllGamesUseCase.execute();

    return new SuccessResponse(games);
  }

  async getGameById(req) {
    const { id } = req.params;
    if (!id) throw new MissingParamError('id');

    const getGameUseCase = new GetGameUseCase(this.repository);
    const game = await getGameUseCase.execute(id);

    if (!game) throw new ClientError('It was not possible to retrieve the specified record', 400);

    return new SuccessResponse(game);
  }

  async deleteGameById(req) {
    const { id } = req.params;
    if (!id) throw new MissingParamError('id');

    const deleteGameUseCase = new DeleteGameUseCase(this.repository);
    const result = await deleteGameUseCase.execute(id);

    if (!result.deleted) throw new ClientError('It was not possible to delete the specified record', 400);
    return new SuccessResponse(result);
  }

  async updateGameById(req) {
    const { id } = req.params;
    if (!id) throw new MissingParamError('id');

    const { title, rating, summary } = req.body;
    if (!(title || rating || summary)) throw new InvalidParamError('At least one field to update must be provided');

    const updateGameUseCase = new UpdateGameUseCase(this.repository);
    const result = await updateGameUseCase.execute(id, { title, rating, summary });

    return new SuccessResponse(result);
  }
}
