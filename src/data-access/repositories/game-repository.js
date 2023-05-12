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
    const result = await this.database.findOne({ id });

    return result;
  }

  async getByTitle(title) {
    const result = await this.database.findOne({ title });

    return result;
  }

  async getAll() {
    const result = await this.database.find();

    return result[0];
  }
}
