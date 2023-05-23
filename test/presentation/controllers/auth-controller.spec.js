import AuthController from '../../../src/presentation/controllers/auth-controller';
import MissingParamError from '../../../src/presentation/errors/missing-param-error';

const makeRepository = () => {
  class UserRepositoryStub {
    async create(user) {
      return await new Promise((resolve) => resolve(makeFakeUser()));
    }
  }

  return new UserRepositoryStub();
};

const makeEmailValidator = () => {
  class EmailValidatorStub {
    isValid(account) {
      return true;
    }
  }

  return new EmailValidatorStub();
};

const makeEncrypter = () => {
  class EncrypterStub {
    async encrypt(value) {
      return new Promise((resolve) => resolve('encrypted_string'));
    }

    async compare(value, encryptedValue) {
      return new Promise((resolve) => resolve(true));
    }
  }

  return new EncrypterStub();
};

const makeTokenizer = () => {
  class TokenizerStub {
    async tokenize(value) {
      return new Promise((resolve) => resolve('token'));
    }

    async verify(token) {
      return new Promise((resolve) => resolve(true));
    }
  }

  return new TokenizerStub();
};

const makeSut = () => {
  const repositoryStub = makeRepository();
  const emailValidatorStub = makeEmailValidator();
  const encrypterStub = makeEncrypter();
  const tokenizerStub = makeTokenizer();
  const sut = new AuthController(repositoryStub, emailValidatorStub, encrypterStub, tokenizerStub);

  return {
    sut,
    repositoryStub,
    emailValidatorStub,
    encrypterStub,
    tokenizerStub,
  };
};

const makeFakeUser = () => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
});

describe('Auth Controller', () => {
  test('Should return 400 on sign up if no name is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const promise = sut.signUp(httpRequest);

    expect(promise).rejects.toEqual(new MissingParamError('name'));
  });

  test('Should return 400 on sign up if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'valid_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const promise = sut.signUp(httpRequest);

    expect(promise).rejects.toEqual(new MissingParamError('email'));
  });
});
