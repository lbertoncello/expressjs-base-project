// export default (repository) => Object.freeze({
//   test: (request, response) => response.json({ test: 'SUCCESSFULL 2' })
// })

import AddGame from '../use-cases/add-game.js';

export default class GameController {
  constructor(repository) {
    this.repository = repository;
  }

  test(request, response) {
    return response.json({ test: 'SUCESSFULL' });
  }

  async addGame(req, res, next) {
    try {
      const addGameUseCase = new AddGame(this.repository);
      const { title, rating, summary } = req.body;
      const result = await addGameUseCase.execute(title, rating, summary);

      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}