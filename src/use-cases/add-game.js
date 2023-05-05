import Game from '../entities/models/game.js';

export default class AddGame {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(title, rating, summary) {
    // Return error if any of the parameters is undefined
    if (!(title && rating && summary)) {
      throw new Error('Not all parameters were informed');
    }

    const game = new Game(title, rating, summary);
    
    return await this.repository.create(game);
  }
}