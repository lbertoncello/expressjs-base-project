import SignUp from '../../use-cases/user/signup.js';
import SignIn from '../../use-cases/user/signin.js';
import SuccessResponse from '../responses/success-response.js';
import ServerErrorResponse from '../responses/server-error-response.js';

export default class UserController {
  constructor(repository, encrypter) {
    this.repository = repository;
    this.encrypter = encrypter;
  }

  async signUp(req) {
    try {
      const { name, email, password } = req.body;
      if (!(name && email && password)) {
        throw new Error('Required parameters not informed');
      }

      const signUpUseCase = new SignUp(this.repository, this.encrypter);
      const result = await signUpUseCase.execute(name, email, password);

      return new SuccessResponse(result);
    } catch (err) {
      console.error(err);
      return new ServerErrorResponse(err.message);
    }
  }

  async signIn(req) {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        throw new Error('Required parameters not informed');
      }

      const signInUseCase = new SignIn(this.repository, this.encrypter);
      const result = await signInUseCase.execute(email, password);

      return new SuccessResponse(result);
    } catch (err) {
      console.error(err);
      return new ServerErrorResponse(err.message);
    }
  }
}
