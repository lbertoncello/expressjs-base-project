import GetUserUseCase from '../../use-cases/user/get-user.js';
import SuccessResponse from '../responses/success-response.js';

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
}
