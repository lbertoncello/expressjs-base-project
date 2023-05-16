import fieldsFilter from '../../utils/fields-filter.js';

export default class UpdateGame {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(id, fields) {
    const allowedFieldNames = ['title', 'rating', 'summary'];
    const filteredFields = fieldsFilter(allowedFieldNames, fields);
    const result = await this.repository.updateById(id, filteredFields);

    return result;
  }
}
