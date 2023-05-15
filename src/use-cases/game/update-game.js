export default class UpdateGame {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(id, fields) {
    const result = await this.repository.updateById(id, fields);

    return result;
  }
}
