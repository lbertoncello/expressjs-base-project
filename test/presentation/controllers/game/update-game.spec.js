import { jest } from '@jest/globals';
import UpdateGameController from '../../../../src/presentation/controllers/game/update-game.js';
import InvalidParamError from '../../../../src/presentation/errors/invalid-param-error.js';
import SuccessResponse from '../../../../src/presentation/responses/success-response.js';

const makeFakeUpdateGame = () => ({
  id: 'valid_id',
  title: 'valid_title',
  rating: 1,
  summary: 'valid_summary',
});

const makeFakeRequest = () => ({
  params: {
    id: 'valid_id',
  },
  body: {
    title: 'valid_title',
    rating: 1,
    summary: 'valid_summary',
  },
  authUser: {
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password',
  },
});

const makeUpdateGame = () => {
  class UpdateGameStub {
    async execute(id, gameData) {
      return await new Promise((resolve) => resolve(makeFakeUpdateGame()));
    }
  }

  return new UpdateGameStub();
};

const makeSut = () => {
  const updateGameStub = makeUpdateGame();
  const sut = new UpdateGameController(updateGameStub);

  return {
    sut,
    updateGameStub,
  };
};

describe('Update Game By Id Controller', () => {
  test('Should return an error if no valid parameter is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        id: 'valid_id',
      },
      body: {
        invalidParameter: 'any_value',
      },
    };
    const promise = sut.handle(httpRequest);

    expect(promise).rejects.toEqual(new InvalidParamError('At least one field to update must be provided'));
  });

  test('Should return an error if no parameter is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        id: 'valid_id',
      },
      body: {},
    };
    const promise = sut.handle(httpRequest);

    expect(promise).rejects.toEqual(new InvalidParamError('At least one field to update must be provided'));
  });

  test('Should execute the use case UpdateGame with correct values', async () => {
    const { sut, updateGameStub } = makeSut();
    const updateGameSpy = jest.spyOn(updateGameStub, 'execute');
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);

    expect(updateGameSpy).toHaveBeenCalledWith(fakeRequest.params.id, fakeRequest.body);
  });

  test('Should execute the use case UpdateGame with allowed fields being passed', async () => {
    const { sut, updateGameStub } = makeSut();
    const updateGameSpy = jest.spyOn(updateGameStub, 'execute');
    const fakeRequest = {
      params: {
        id: 'valid_id',
      },
      body: {
        title: 'valid_title',
        rating: 1,
        summary: 'valid_summary',
        invalidParameter: 'any_value',
      },
    };
    const validParameters = {
      title: 'valid_title',
      rating: 1,
      summary: 'valid_summary',
    };
    await sut.handle(fakeRequest);

    expect(updateGameSpy).toHaveBeenCalledWith(fakeRequest.params.id, validParameters);
  });

  test('Should throw an error if the use case UpdateGame throws', async () => {
    const { sut, updateGameStub } = makeSut();
    jest.spyOn(updateGameStub, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.handle(makeFakeRequest());

    expect(promise).rejects.toEqual(new Error());
  });

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(new SuccessResponse(makeFakeUpdateGame()));
  });
});
