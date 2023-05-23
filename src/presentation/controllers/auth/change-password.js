import SuccessResponse from '../../responses/success-response.js';
import InvalidParamError from '../../errors/invalid-param-error.js';
import MissingParamError from '../../errors/missing-param-error.js';
import ApplicationError from '../../errors/application-error.js';

export default class ChangePasswordController {
  constructor(changePassword) {
    this.changePassword = changePassword;
  }

  async handle(req) {
    const requiredFields = ['password', 'passwordConfirmation', 'oldPassword'];
    for (const requiredField of requiredFields) {
      if (!req.body[requiredField]) {
        throw new MissingParamError(requiredField);
      }
    }

    const { password, passwordConfirmation, oldPassword } = req.body;
    if (password !== passwordConfirmation)
      throw new InvalidParamError('The password does not match the password confirmation');

    const signedUser = req.authUser;
    const result = await this.changePassword.execute(signedUser, password, oldPassword);

    if (!result.previousPasswordMatch)
      throw new InvalidParamError('The previous password does not match the password provided');

    if (!result.updated) throw new ApplicationError('It was not possible to change your password');

    return new SuccessResponse(result);
  }
}
