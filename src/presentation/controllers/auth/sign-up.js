import SuccessResponse from '../../responses/success-response.js';
import InvalidParamError from '../../errors/invalid-param-error.js';
import MissingParamError from '../../errors/missing-param-error.js';
import ClientError from '../../errors/client-error.js';

export default class SignUpController {
  constructor(signUp, emailValidator) {
    this.signUp = signUp;
    this.emailValidator = emailValidator;
  }

  // TODO add rule to refuse weak passwords
  async handle(req) {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
    for (const requiredField of requiredFields) {
      if (!req.body[requiredField]) {
        throw new MissingParamError(requiredField);
      }
    }

    const { name, email, password, passwordConfirmation } = req.body;
    if (password !== passwordConfirmation)
      throw new InvalidParamError('The password does not match the password confirmation');

    const isEmailValid = this.emailValidator.isValid(email);
    if (!isEmailValid) throw new InvalidParamError("'email' is not valid");

    const result = await this.signUp.execute({ name, email, password });
    if (!result) throw new ClientError('User already exists', 401);

    return new SuccessResponse(result);
  }
}
