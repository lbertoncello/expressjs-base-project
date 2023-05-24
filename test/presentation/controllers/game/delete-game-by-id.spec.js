import { jest } from '@jest/globals';
import DeleteGameById from '../../../../src/presentation/controllers/game/delete-game-by-id.js';
import SuccessResponse from '../../../../src/presentation/responses/success-response.js';
import ApplicationError from '../../../../src/presentation/errors/application-error.js';

const makeFakeDeleteGameById = () => ({
  deleted: true,
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

const makeDeleteGameById = () => {
  class DeleteGameByIdStub {
    async execute(signedUser) {
      return await new Promise((resolve) => resolve(makeFakeDeleteGameById()));
    }
  }

  return new DeleteGameByIdStub();
};

const makeSut = () => {
  const deleteGameByIdStub = makeDeleteGameById();
  const sut = new DeleteGameById(deleteGameByIdStub);

  return {
    sut,
    deleteGameByIdStub,
  };
};

describe('Delete Game By Id Controller', () => {
  test('Should execute the use case DeleteGame with correct values', async () => {
    const { sut, deleteGameByIdStub } = makeSut();
    const deleteGameByIdSpy = jest.spyOn(deleteGameByIdStub, 'execute');
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);

    expect(deleteGameByIdSpy).toHaveBeenCalledWith(fakeRequest.params.id);
  });

  test('Should throw an error if the use case DeleteGame throws', async () => {
    const { sut, deleteGameByIdStub } = makeSut();
    jest.spyOn(deleteGameByIdStub, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.handle(makeFakeRequest());

    expect(promise).rejects.toEqual(new Error());
  });

  test('Should throw an error if the use case DeleteGame fails', async () => {
    const { sut, deleteGameByIdStub } = makeSut();
    jest.spyOn(deleteGameByIdStub, 'execute').mockResolvedValueOnce({
      deleted: false,
    });
    const promise = sut.handle(makeFakeRequest());

    expect(promise).rejects.toEqual(new ApplicationError('It was not possible to delete the specified record', 400));
  });

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(new SuccessResponse(makeFakeDeleteGameById()));
  });
});
