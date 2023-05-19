import fieldsFilter from '../../utils/fields-filter.js';

export default class UpdateUser {
  constructor(repository) {
    this.repository = repository;
  }

  // It is only allowed to update the user signed in
  async execute(signedUser, fields) {
    const allowedFieldNames = ['name'];
    const filteredFields = fieldsFilter(allowedFieldNames, fields);
    const id = signedUser.id;
    const result = await this.repository.updateById(id, filteredFields);

    return result;
  }
}
