import { jest } from '@jest/globals';
import GetGameByIdController from '../../../../src/presentation/controllers/game/get-game-by-id.js';
import ClientError from '../../../../src/presentation/errors/client-error.js';
import SuccessResponse from '../../../../src/presentation/responses/success-response.js';

const makeFakeGetGameByIdResponse = () => ({
  id: 'valid_id',
  title: 'valid_title',
  rating: 1,
  summary: 'valid_summary',
});

const makeFakeRequest = () => ({
  params: {
    id: 'valid_id',
  },
  authUser: {
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password',
  },
});

const makeGetGameById = () => {
  class GetGameByIdStub {
    async execute(id) {
      return await new Promise((resolve) => resolve(makeFakeGetGameByIdResponse()));
    }
  }

  return new GetGameByIdStub();
};

const makeSut = () => {
  const getGameByIdStub = makeGetGameById();
  const sut = new GetGameByIdController(getGameByIdStub);

  return {
    sut,
    getGameByIdStub,
  };
};

describe('Sign Up Controller', () => {
  test('Should return an error if there is no record with the provided id', async () => {
    const { sut, getGameByIdStub } = makeSut();
    const httpRequest = {
      params: {
        id: 'invalid_id',
      },
    };
    jest.spyOn(getGameByIdStub, 'execute').mockResolvedValueOnce(false);
    const promise = sut.handle(httpRequest);

    expect(promise).rejects.toEqual(new ClientError('It was not possible to retrieve the specified record', 400));
  });

  test('Should execute the use case GetGameById with correct values', async () => {
    const { sut, getGameByIdStub } = makeSut();
    const getGameByIdSpy = jest.spyOn(getGameByIdStub, 'execute');
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);

    expect(getGameByIdSpy).toHaveBeenCalledWith(fakeRequest.params.id);
  });

  test('Should throw an error if the use case GetGameById throws', async () => {
    const { sut, getGameByIdStub } = makeSut();
    jest.spyOn(getGameByIdStub, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.handle(makeFakeRequest());

    expect(promise).rejects.toEqual(new Error());
  });

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(new SuccessResponse(makeFakeGetGameByIdResponse()));
  });
});
