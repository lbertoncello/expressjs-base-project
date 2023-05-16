import GetUserUseCase from '../../use-cases/user/get-user.js';
import UpdateUserUseCase from '../../use-cases/user/update-user.js';
import SuccessResponse from '../responses/success-response.js';
import InvalidParamError from '../errors/invalid-param-error.js';

export default class UserController {
  constructor(repository) {
    this.repository = repository;
  }

  async getMyUserData(req) {
    const loggedUser = req.authUser;
    const getUserUseCase = new GetUserUseCase(this.repository);
    const user = await getUserUseCase.execute(loggedUser);

    return new SuccessResponse(user);
  }

  async updateMyUserData(req) {
    const { name, email } = req.body;
    if (!(name || email)) throw new InvalidParamError('At least one field to update must be provided');

    const loggedUser = req.authUser;
    const updateUserUseCase = new UpdateUserUseCase(this.repository);
    const updatedUser = await updateUserUseCase.execute(loggedUser, { name, email });

    return new SuccessResponse(updatedUser);
  }
}
