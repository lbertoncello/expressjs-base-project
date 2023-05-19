import request from 'supertest';
import app from '../../../src/main/app.js';
import dbLoader from '../../../src/main/loaders/db-loader.js';
import UserDatabase from '../../../src/data-access/database/user-database.js';
import JwtAdapter from '../../../src/data-access/auth/jwt-adapter.js';
import envConfig from '../../../src/main/config/env/env.js';

describe('User Routes', () => {
  let connection = null;
  let database = null;

  const signInUser = async () => {
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
    const jwtAdapter = new JwtAdapter(envConfig.secrets.jwt, envConfig.secrets.jwtExp);
    const decoded = await jwtAdapter.verify(res.body.data.token);

    return { token: res.body.data.token, user: decoded };
  };

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

  test('Should return the user signed in on success', async () => {
    const { token, user } = await signInUser();
    const res = await request(app).get('/api/v1/user/me').send().set('Authorization', `Bearer ${token}`).expect(200);
    const userSignedIn = res.body.data;

    expect(userSignedIn.id).toBe(user.id);
    expect(userSignedIn.name).toBe('Lucas');
    expect(userSignedIn.email).toBe('lucas@mail.com');
  });
});
