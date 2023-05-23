import SuccessResponse from '../../responses/success-response.js';
import InvalidParamError from '../../errors/invalid-param-error.js';
import MissingParamError from '../../errors/missing-param-error.js';

export default class UpdateGameByIdController {
  constructor(updateGame) {
    this.updateGame = updateGame;
  }

  async handle(req) {
    const { id } = req.params;
    if (!id) throw new MissingParamError('id');

    const { title, rating, summary } = req.body;
    if (!(title || rating || summary)) throw new InvalidParamError('At least one field to update must be provided');

    const result = await this.updateGame.execute(id, { title, rating, summary });

    return new SuccessResponse(result);
  }
}
