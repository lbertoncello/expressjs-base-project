import Game from '../../entities/game.js';

export default class AddGame {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(title, rating, summary) {
    const game = new Game(title, rating, summary);

    return await this.repository.create(game);
  }
}
