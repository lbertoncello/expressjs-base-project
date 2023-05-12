import { MongooseHelper } from '../helpers/mongoose-helper.js';

export default class UserRepository {
  constructor(database) {
    this.database = database;
  }

  async create(user) {
    const result = await this.database(user).save();

    return MongooseHelper.map(result);
  }

  async getById(id) {
    const result = await this.database.findOne({ id });

    return MongooseHelper.map(result);
  }

  async getByEmail(email) {
    const result = await this.database.findOne({ email });

    return MongooseHelper.map(result);
  }

  async getByEmailWithPassword(email) {
    const result = await this.database.findOne({ email }).select('+password').lean();

    return MongooseHelper.map(result);
  }

  async getAll() {
    const result = await this.database.find();

    return result[0];
  }
}
