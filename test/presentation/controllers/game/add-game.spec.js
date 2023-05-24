import { jest } from '@jest/globals';
import AddGameController from '../../../../src/presentation/controllers/game/add-game.js';
import MissingParamError from '../../../../src/presentation/errors/missing-param-error.js';
import SuccessResponse from '../../../../src/presentation/responses/success-response.js';

const makeFakeUser = () => ({
  id: 'valid_id',
  title: 'valid_title',
  rating: 1,
  summary: 'valid_summary',
});

const makeFakeRequest = () => ({
  body: {
    title: 'any_title',
    rating: 1,
    summary: 'any_summary',
  },
  authUser: {
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password',
  },
});

const makeAddGame = () => {
  class AddGameStub {
    async execute(gameData) {
      return await new Promise((resolve) => resolve(makeFakeUser()));
    }
  }

  return new AddGameStub();
};

const makeSut = () => {
  const addGameStub = makeAddGame();
  const sut = new AddGameController(addGameStub);

  return {
    sut,
    addGameStub,
  };
};

describe('Sign Up Controller', () => {
  test('Should return an error if no title is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        rating: 1,
        summary: 'any_summary',
      },
    };
    const promise = sut.handle(httpRequest);

    expect(promise).rejects.toEqual(new MissingParamError('title'));
  });

  test('Should return an error if no rating is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        title: 'any_title',
        summary: 'any_summary',
      },
    };
    const promise = sut.handle(httpRequest);

    expect(promise).rejects.toEqual(new MissingParamError('rating'));
  });

  test('Should return an error if no summary is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        title: 'any_title',
        rating: 1,
      },
    };
    const promise = sut.handle(httpRequest);

    expect(promise).rejects.toEqual(new MissingParamError('summary'));
  });

  test('Should execute the use case AddGame with correct values', async () => {
    const { sut, addGameStub } = makeSut();
    const addGameSpy = jest.spyOn(addGameStub, 'execute');
    await sut.handle(makeFakeRequest());

    expect(addGameSpy).toHaveBeenCalledWith({
      title: 'any_title',
      rating: 1,
      summary: 'any_summary',
    });
  });

  test('Should throw an error if the use case AddGame throws', async () => {
    const { sut, addGameStub } = makeSut();
    jest.spyOn(addGameStub, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.handle(makeFakeRequest());

    expect(promise).rejects.toEqual(new Error());
  });

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(new SuccessResponse(makeFakeUser()));
  });
});
