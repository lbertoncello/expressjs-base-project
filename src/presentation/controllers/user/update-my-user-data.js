import SuccessResponse from '../../responses/success-response.js';
import InvalidParamError from '../../errors/invalid-param-error.js';

export default class UpdateMyUserDataController {
  constructor(updateUser) {
    this.updateUser = updateUser;
  }

  async handle(req) {
    const { name } = req.body;
    if (!name) throw new InvalidParamError('At least one field to update must be provided');

    const signedUser = req.authUser;
    const updatedUser = await this.updateUser.execute(signedUser, { name });

    return new SuccessResponse(updatedUser);
  }
}
