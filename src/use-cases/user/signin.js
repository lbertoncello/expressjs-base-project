export default class SignIn {
  constructor(repository, encrypter) {
    this.repository = repository;
    this.encrypter = encrypter;
  }

  async execute(email, password) {
    const dbUser = await this.repository.getByEmailWithPassword(email);

    if (!dbUser) {
      return null;
    }

    const passwordMatch = await this.encrypter.compare(password, dbUser.password);
    if (!passwordMatch) {
      return null;
    }

    return { test: 'sucesso' };
  }
}
