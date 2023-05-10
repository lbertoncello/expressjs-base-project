export default class UserRepository {
  constructor(database) {
    this.database = database;
  }

  async create(user) {
    // return new Promise((resolve, reject) => {
    //   this.database(user).save();
    //   resolve(user);
    // });

    const result = await this.database(user).save();

    return result;
  }

  async getById(id) {
    const result = await this.database.find({ id });

    return result[0];
  }

  async getByEmail(email) {
    const result = await this.database.find({ email });

    return result[0];
  }

  async getAll() {
    const result = await this.database.find();

    return result[0];
  }
}
