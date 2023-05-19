import request from 'supertest';
import app from '../../../src/main/app.js';
import dbLoader from '../../../src/main/loaders/db-loader.js';
import UserDatabase from '../../../src/data-access/database/user-database.js';

describe('Auth Routes', () => {
  let connection = null;
  let database = null;

  beforeAll(async () => {
    connection = await dbLoader();
    database = new UserDatabase();
  });

  beforeEach(async () => {
    await database.deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  test('Should return an account on Sign Up on success', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        name: 'Lucas',
        email: 'lucas@mail.com',
        password: '123',
        passwordConfirmation: '123',
      })
      .expect(200);
    const user = res.body.data;

    expect(user.name).toBe('Lucas');
    expect(user.email).toBe('lucas@mail.com');
  });
});
