import AddGame from '../../use-cases/game/add-game.js';
import SuccessResponse from '../responses/success-response.js';
import ServerErrorResponse from '../responses/server-error-response.js';

export default class GameController {
  constructor(repository) {
    this.repository = repository;
  }

  async addGame(req) {
    try {
      const addGameUseCase = new AddGame(this.repository);
      const { title, rating, summary } = req.body;
      const result = await addGameUseCase.execute(title, rating, summary);

      return new SuccessResponse(result);
    } catch (err) {
      return new ServerErrorResponse(err.message);
    }
  }
}
