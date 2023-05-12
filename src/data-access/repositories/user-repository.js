import { MongooseHelper } from '../helpers/mongoose-helper.js';

export default class UserRepository {
  constructor(database) {
    this.database = database;
  }

  async create(user) {
    const result = await this.database(user).save();

    return MongooseHelper.map(result.toJSON());
  }

  async getById(id) {
    const result = await this.database.findById(id).lean();

    return MongooseHelper.map(result);
  }

  async getByEmail(email) {
    const result = await this.database.findOne({ email }).lean();

    return MongooseHelper.map(result);
  }

  async getByEmailWithPassword(email) {
    const result = await this.database.findOne({ email }).select('+password').lean();

    return MongooseHelper.map(result);
  }

  async getAll() {
    const result = await this.database.find().lean();

    return MongooseHelper.mapAll(result);
  }
}
