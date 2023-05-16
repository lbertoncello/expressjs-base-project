export default class GetUser {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(loggedUser) {
    const id = loggedUser.id;
    const user = await this.repository.getById(id);

    return user;
  }
}
