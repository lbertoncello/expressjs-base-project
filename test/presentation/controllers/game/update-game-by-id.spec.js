import { jest } from '@jest/globals';
import UpdateGameByIdController from '../../../../src/presentation/controllers/game/update-game-by-id.js';
import InvalidParamError from '../../../../src/presentation/errors/invalid-param-error.js';
import SuccessResponse from '../../../../src/presentation/responses/success-response.js';

const makeFakeUpdateGameById = () => ({
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

const makeUpdateGameById = () => {
  class UpdateGameByIdStub {
    async execute(id, gameData) {
      return await new Promise((resolve) => resolve(makeFakeUpdateGameById()));
    }
  }

  return new UpdateGameByIdStub();
};

const makeSut = () => {
  const updateGameByIdStub = makeUpdateGameById();
  const sut = new UpdateGameByIdController(updateGameByIdStub);

  return {
    sut,
    updateGameByIdStub,
  };
};

describe('Update Game Controller', () => {
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

  test('Should execute the use case UpdateGameById with correct values', async () => {
    const { sut, updateGameByIdStub } = makeSut();
    const updateGameByIdSpy = jest.spyOn(updateGameByIdStub, 'execute');
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);

    expect(updateGameByIdSpy).toHaveBeenCalledWith(fakeRequest.params.id, fakeRequest.body);
  });

  test('Should execute the use case UpdateGameById with allowed fields being passed', async () => {
    const { sut, updateGameByIdStub } = makeSut();
    const updateGameByIdSpy = jest.spyOn(updateGameByIdStub, 'execute');
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

    expect(updateGameByIdSpy).toHaveBeenCalledWith(fakeRequest.params.id, validParameters);
  });

  test('Should throw an error if the use case UpdateGameById throws', async () => {
    const { sut, updateGameByIdStub } = makeSut();
    jest.spyOn(updateGameByIdStub, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.handle(makeFakeRequest());

    expect(promise).rejects.toEqual(new Error());
  });

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(new SuccessResponse(makeFakeUpdateGameById()));
  });
});
