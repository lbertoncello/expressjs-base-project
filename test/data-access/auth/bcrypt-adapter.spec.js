import { jest } from '@jest/globals';
import bcrypt from 'bcrypt';
import BcryptAdapter from '../../../src/data-access/auth/bcrypt-adapter.js';

const saltRounds = 10;
const makeSut = () => {
  const sut = new BcryptAdapter(saltRounds);

  return sut;
};

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt genSalt with correct values', async () => {
    const sut = makeSut();
    const genSaltSpy = jest.spyOn(bcrypt, 'genSalt');
    await sut.encrypt('any_value');

    expect(genSaltSpy).toHaveBeenCalledWith(saltRounds);
  });

  test('Should call bcrypt hash with correct values', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    jest.spyOn(bcrypt, 'genSalt').mockResolvedValueOnce('$2b$10$Xyl6MTOp4c6y6QrYmiK5G.');
    await sut.encrypt('any_value');

    expect(hashSpy).toHaveBeenCalledWith('any_value', '$2b$10$Xyl6MTOp4c6y6QrYmiK5G.');
  });

  test('Should return a hash on success', async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
      return await new Promise((resolve) => resolve('hash'));
    });
    const hash = await sut.encrypt('any_value');

    expect(hash).toBe('hash');
  });
});
