import AddUser from '../../use-cases/add-user.js';
import SuccessResponse from '../responses/success-response.js';
import ServerErrorResponse from '../responses/server-error-response.js';

export default class UserController {
  constructor(repository) {
    this.repository = repository;
  }

  async addUser(req) {
    try {
      const addUserUseCase = new AddUser(this.repository);
      const { name, email, password } = req.body;

      if (!(name && email && password)) {
        throw new Error('Not all parameters were informed');
      }
      const result = await addUserUseCase.execute(name, email, password);

      return new SuccessResponse(result);
    } catch (err) {
      return new ServerErrorResponse(err.message);
    }
  }
}
