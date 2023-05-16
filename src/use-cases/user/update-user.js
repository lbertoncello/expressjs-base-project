import fieldsFilter from '../../utils/fields-filter.js';

export default class UpdateUser {
  constructor(repository) {
    this.repository = repository;
  }

  // It is only allowed to get the signed in user
  async execute(loggedUser, fields) {
    const allowedFieldNames = ['name', 'email'];
    const filteredFields = fieldsFilter(allowedFieldNames, fields);
    const id = loggedUser.id;
    const result = await this.repository.updateById(id, filteredFields);

    return result;
  }
}
