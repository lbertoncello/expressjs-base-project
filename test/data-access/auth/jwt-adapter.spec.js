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

  test('Should return a token on success', async () => {
    const sut = makeSut();
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    jest.spyOn(jwt, 'sign').mockResolvedValueOnce(token);
    const value = 'value';
    const result = await sut.tokenize({ value });

    expect(result).toBe(token);
  });
});
