import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import JwtAdapter from '../../../src/data-access/auth/jwt-adapter.js';

const secret = 'any_secret';
const expire = '1h';
const makeSut = () => {
  const sut = new JwtAdapter(secret, expire);

  return sut;
};

describe('JWT Adapter', () => {
  test('Should call JWT sign with the correct values', async () => {
    const sut = makeSut();
    const signSpy = jest.spyOn(jwt, 'sign');
    const value = 'value';
    await sut.tokenize({ value });

    expect(signSpy).toHaveBeenCalledWith({ value }, secret, { expiresIn: expire });
  });
});
