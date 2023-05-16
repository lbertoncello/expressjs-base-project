import _ from 'lodash';
import User from '../../entities/user.js';

export default class SignUp {
  constructor(repository, encrypter) {
    this.repository = repository;
    this.encrypter = encrypter;
  }

  async execute(name, email, password) {
    const dbUser = await this.repository.getByEmail(email);
    if (dbUser) {
      return null;
    }

    const encryptedPassword = await this.encrypter.encrypt(password);
    const user = new User(name, email, encryptedPassword);

    const createdDbUser = await this.repository.create(user);
    if (!createdDbUser) return null;

    // Remove password before returning if needed
    if (createdDbUser.password) return _.omit(createdDbUser, 'password');
    return createdDbUser;
  }
}
