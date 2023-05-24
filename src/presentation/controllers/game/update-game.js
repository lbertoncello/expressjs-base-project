import SuccessResponse from '../../responses/success-response.js';
import InvalidParamError from '../../errors/invalid-param-error.js';
import MissingParamError from '../../errors/missing-param-error.js';

export default class UpdateGameController {
  constructor(updateGame) {
    this.updateGame = updateGame;
  }

  async handle(req) {
    const { id } = req.params;
    if (!id) throw new MissingParamError('id');

    const allowedFields = ['title', 'rating', 'summary'];
    const gameData = {};
    // Filter only the allowed fields
    for (const allowedField of allowedFields) {
      if (req.body[allowedField]) {
        gameData[allowedField] = req.body[allowedField];
      }
    }

    if (Object.entries(gameData).length === 0) {
      throw new InvalidParamError('At least one field to update must be provided');
    }

    const result = await this.updateGame.execute(id, gameData);

    return new SuccessResponse(result);
  }
}
