import ClientError from '../../presentation/errors/client-error.js';

export default class SignIn {
  constructor(repository, encrypter) {
    this.repository = repository;
    this.encrypter = encrypter;
  }

  async execute(email, password) {
    const dbUser = await this.repository.getByEmailWithPassword(email);

    if (!dbUser) {
      throw new ClientError('User does not exist', 401);
    }

    const passwordMatch = await this.encrypter.compare(password, dbUser.password);
    if (!passwordMatch) {
      throw new ClientError('Password does not match', 401);
    }

    return { test: 'sucesso' };
  }
}
