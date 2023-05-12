export default class UserRepository {
  constructor(database) {
    this.database = database;
  }

  async create(user) {
    const result = await this.database(user).save();

    return result;
  }

  async getById(id) {
    const result = await this.database.findOne({ id });

    return result;
  }

  async getByEmail(email) {
    const result = await this.database.findOne({ email });

    return result;
  }

  async getByEmailWithPassword(email) {
    const result = await this.database.findOne({ email }).select('+password');

    return result;
  }

  async getAll() {
    const result = await this.database.find();

    return result[0];
  }
}
