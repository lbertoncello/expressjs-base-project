// TODO add some way to remove unwanted fields from the return
export default class GameRepository {
  constructor(database) {
    this.database = database;
  }

  async create(game) {
    const result = await this.database(game).save();

    return result;
  }

  async getById(id) {
    const result = await this.database.find({ id });

    return result[0];
  }

  async getByTitle(title) {
    const result = await this.database.find({ title });

    return result[0];
  }

  async getAll() {
    const result = await this.database.find();

    return result[0];
  }
}
