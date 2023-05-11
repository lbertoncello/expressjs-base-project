import SignUp from '../../use-cases/user/signup.js';
import SuccessResponse from '../responses/success-response.js';
import ServerErrorResponse from '../responses/server-error-response.js';

export default class UserController {
  constructor(repository, encrypter) {
    this.repository = repository;
    this.encrypter = encrypter;
  }

  async signUp(req) {
    try {
      const signUpUseCase = new SignUp(this.repository, this.encrypter);
      const { name, email, password } = req.body;

      if (!(name && email && password)) {
        throw new Error('Not all parameters were informed');
      }
      const result = await signUpUseCase.execute(name, email, password);

      return new SuccessResponse(result);
    } catch (err) {
      return new ServerErrorResponse(err.message);
    }
  }
}
