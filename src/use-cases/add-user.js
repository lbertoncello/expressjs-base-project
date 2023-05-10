// TODO add validation
// TODO encrypt password
import User from '../entities/models/user.js';

export default class AddUser {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(name, email, password) {
    const dbUser = await this.repository.getByEmail(email);
    if (dbUser) {
      throw new Error('User already exists');
    }

    const user = new User(name, email, password);

    return await this.repository.create(user);
  }
}
