import SignUp from '../../use-cases/auth/signup.js';
import SignIn from '../../use-cases/auth/signin.js';
import SignOut from '../../use-cases/auth/signout.js';
import SuccessResponse from '../responses/success-response.js';
import InvalidParamError from '../errors/invalid-param-error.js';
import MissingParamError from '../errors/missing-param-error.js';
import ClientError from '../errors/client-error.js';

export default class AuthController {
  constructor(repository, emailValidator, encrypter, tokenizer) {
    this.repository = repository;
    this.emailValidator = emailValidator;
    this.encrypter = encrypter;
    this.tokenizer = tokenizer;
  }

  async signUp(req) {
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

    const signUpUseCase = new SignUp(this.repository, this.encrypter);
    const result = await signUpUseCase.execute(name, email, password);
    if (!result) throw new ClientError('User already exists', 401);

    return new SuccessResponse(result);
  }

  async signIn(req) {
    const requiredFields = ['email', 'password'];
    for (const requiredField of requiredFields) {
      if (!req.body[requiredField]) {
        throw new MissingParamError(requiredField);
      }
    }

    const { email, password } = req.body;
    const signInUseCase = new SignIn(this.repository, this.encrypter, this.tokenizer);
    const result = await signInUseCase.execute(email, password);
    if (!result) throw new ClientError('Password does not match or the user does not exist', 401);

    return new SuccessResponse(result);
  }

  async signOut(req) {
    const signOutUseCase = new SignOut();
    const result = await signOutUseCase.execute();

    return new SuccessResponse(result);
  }
}
