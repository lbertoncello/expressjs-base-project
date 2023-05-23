import SuccessResponse from '../../responses/success-response.js';
import MissingParamError from '../../errors/missing-param-error.js';

export default class AddGameController {
  constructor(addGame) {
    this.addGame = addGame;
  }

  async handle(req) {
    const requiredFielsd = ['title', 'rating', 'summary'];
    for (const requiredField of requiredFielsd) {
      if (!req.body[requiredField]) {
        throw new MissingParamError(requiredField);
      }
    }

    const { title, rating, summary } = req.body;
    const result = await this.addGame.execute(title, rating, summary);

    return new SuccessResponse(result);
  }
}
