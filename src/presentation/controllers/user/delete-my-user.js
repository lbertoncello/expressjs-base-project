import SuccessResponse from '../../responses/success-response.js';
import ClientError from '../../errors/client-error.js';

export default class DeleteMyUserController {
  constructor(deleteUser) {
    this.deleteUser = deleteUser;
  }

  async handle(req) {
    const signedUser = req.authUser;
    const result = await this.deleteUser.execute(signedUser);

    if (!result.deleted) throw new ClientError('It was not possible to delete the specified record', 400);
    return new SuccessResponse(result);
  }
}
