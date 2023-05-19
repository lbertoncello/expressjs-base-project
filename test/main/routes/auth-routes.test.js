import request from 'supertest';
import app from '../../../src/main/app.js';
import dbLoader from '../../../src/main/loaders/db-loader.js';
import UserDatabase from '../../../src/data-access/database/user-database.js';
import JwtAdapter from '../../../src/data-access/auth/jwt-adapter.js';
import BcrypterAdapter from '../../../src/data-access/auth/bcrypt-adapter.js';
import envConfig from '../../../src/main/config/env/env.js';

describe('Auth Routes', () => {
  let connection = null;
  let database = null;

  beforeAll(async () => {
    // Get mongodb memory server url from env
    connection = await dbLoader(process.env.MONGO_URL);
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

  test('Should return a token on Sign In on success', async () => {
    await request(app).post('/api/v1/auth/signup').send({
      name: 'Lucas',
      email: 'lucas@mail.com',
      password: '123',
      passwordConfirmation: '123',
    });

    const res = await request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'lucas@mail.com',
        password: '123',
      })
      .expect(200);

    const token = res.body.data.token;
    const jwtAdapter = new JwtAdapter(envConfig.secrets.jwt, envConfig.secrets.jwtExp);
    const decoded = await jwtAdapter.verify(token);

    expect(decoded).toBeTruthy();
    expect(decoded.name).toBe('Lucas');
    expect(decoded.email).toBe('lucas@mail.com');
  });

  test("Should successfully change the user's password if valid data is provided", async () => {
    await request(app).post('/api/v1/auth/signup').send({
      name: 'Lucas',
      email: 'lucas@mail.com',
      password: '123',
      passwordConfirmation: '123',
    });
    const signInRes = await request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'lucas@mail.com',
        password: '123',
      })
      .expect(200);
    const token = signInRes.body.data.token;

    const changePasswordRes = await request(app)
      .post('/api/v1/auth/password')
      .send({
        password: 'abcd',
        passwordConfirmation: 'abcd',
        oldPassword: '123',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const feedback = changePasswordRes.body.data;
    const bcrypterAdapter = new BcrypterAdapter();
    const dbUser = await database.findOne({ email: 'lucas@mail.com' }).select('+password').lean();
    const passwordMatch = await bcrypterAdapter.compare('abcd', dbUser.password);

    expect(feedback.previousPasswordMatch).toBeTruthy();
    expect(feedback.updated).toBeTruthy();
    expect(passwordMatch).toBeTruthy();
  });
});
