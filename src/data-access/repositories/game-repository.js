// TODO change Promises to async/await
export default class GameRepository {
  constructor(database) {
    this.database = database;
  }

  create(game) {
    return new Promise((resolve, reject) => {
      this.database(game).save();
      resolve(game);
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      this.database.find({ id }).then((game) => {
        resolve(game[0]);
      });
    });
  }

  getByTitle(title) {
    return new Promise((resolve, reject) => {
      this.database.find({ title }).then((game) => {
        resolve(game[0]);
      });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      const games = this.database.find();

      return games;
    });
  }
}
