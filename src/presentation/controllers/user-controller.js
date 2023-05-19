import GetUserUseCase from '../../use-cases/user/get-user.js';
import UpdateUserUseCase from '../../use-cases/user/update-user.js';
import DeleteUserUseCase from '../../use-cases/user/delete-user.js';
import SuccessResponse from '../responses/success-response.js';
import InvalidParamError from '../errors/invalid-param-error.js';
import ClientError from '../errors/client-error.js';

export default class UserController {
  constructor(repository) {
    this.repository = repository;
  }

  // TODO add update password route
  async getMyUserData(req) {
    const signedUser = req.authUser;
    const getUserUseCase = new GetUserUseCase(this.repository);
    const user = await getUserUseCase.execute(signedUser);

    if (!user) throw new ClientError('It was not possible to retrieve the specified record', 400);

    return new SuccessResponse(user);
  }

  async updateMyUserData(req) {
    const { name } = req.body;
    if (!name) throw new InvalidParamError('At least one field to update must be provided');

    const signedUser = req.authUser;
    const updateUserUseCase = new UpdateUserUseCase(this.repository);
    const updatedUser = await updateUserUseCase.execute(signedUser, { name });

    return new SuccessResponse(updatedUser);
  }

  async deleteMyUser(req) {
    const signedUser = req.authUser;
    const deleteUserUseCase = new DeleteUserUseCase(this.repository);
    const result = await deleteUserUseCase.execute(signedUser);

    if (!result.deleted) throw new ClientError('It was not possible to delete the specified record', 400);
    return new SuccessResponse(result);
  }
}
