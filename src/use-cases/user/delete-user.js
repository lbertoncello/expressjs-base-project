export default class DeleteUser {
  constructor(repository) {
    this.repository = repository;
  }

  // It is only allowed to delete the user signed in
  async execute(loggedUser) {
    const id = loggedUser.id;
    const result = await this.repository.deleteById(id);

    return result;
  }
}
