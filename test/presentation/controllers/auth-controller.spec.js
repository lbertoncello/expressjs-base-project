import { jest } from '@jest/globals';
import SignUpController from '../../../src/presentation/controllers/auth/sign-up.js';
import MissingParamError from '../../../src/presentation/errors/missing-param-error';
import InvalidParamError from '../../../src/presentation/errors/invalid-param-error';

const makeFakeUser = () => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
});

const makeFakeRequest = () => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

const makeEmailValidator = () => {
  class EmailValidatorStub {
    isValid(account) {
      return true;
    }
  }

  return new EmailValidatorStub();
};

const makeSignUp = () => {
  class SignUpStub {
    async execute(name, email, password) {
      return await new Promise((resolve) => resolve(makeFakeUser()));
    }
  }

  return new SignUpStub();
};

const makeSut = () => {
  const signUpStub = makeSignUp();
  const emailValidatorStub = makeEmailValidator();
  const sut = new SignUpController(signUpStub, emailValidatorStub);

  return {
    sut,
    emailValidatorStub,
  };
};

describe('Auth Controller', () => {
  test('Should return an error on sign up if no name is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const promise = sut.handle(httpRequest);

    expect(promise).rejects.toEqual(new MissingParamError('name'));
  });

  test('Should return an error on sign up if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'valid_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const promise = sut.handle(httpRequest);

    expect(promise).rejects.toEqual(new MissingParamError('email'));
  });

  test('Should return an error on sign up if no password is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        passwordConfirmation: 'any_password',
      },
    };
    const promise = sut.handle(httpRequest);

    expect(promise).rejects.toEqual(new MissingParamError('password'));
  });

  test('Should return an error on sign up if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'any_password',
      },
    };
    const promise = sut.handle(httpRequest);

    expect(promise).rejects.toEqual(new MissingParamError('passwordConfirmation'));
  });

  test('Should return an error if password confirmation fails', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'invalid_password',
      },
    };
    const promise = sut.handle(httpRequest);

    expect(promise).rejects.toEqual(new InvalidParamError('The password does not match the password confirmation'));
  });

  test('Should return an error on sign up if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const promise = sut.handle(makeFakeRequest());

    expect(promise).rejects.toEqual(new InvalidParamError("'email' is not valid"));
  });
});
