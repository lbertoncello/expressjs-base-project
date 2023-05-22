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

  test('Should return a token sign on success', async () => {
    const sut = makeSut();
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6ImFueV92YWx1ZSJ9.lz5pVAHfZ0mj2YgGTWkmHfVIUliIlHxGRx9_Fo5tkVE';
    jest.spyOn(jwt, 'sign').mockResolvedValueOnce(token);
    const value = 'any_value';
    const result = await sut.tokenize({ value });

    expect(result).toBe(token);
  });

  test('Should throw if jwt adapter throws on tokenize', async () => {
    const sut = makeSut();
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.tokenize({ value: 'any_value' });

    expect(promise).rejects.toThrow();
  });
});
