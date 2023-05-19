import request from 'supertest';
import app from '../../../src/main/app.js';
import dbLoader from '../../../src/main/loaders/db-loader.js';
import GameDatabase from '../../../src/data-access/database/game-database.js';

describe('Game Routes', () => {
  let connection = null;
  let database = null;
  let token = null;

  const getAuthToken = async () => {
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

    return res.body.data.token;
  };

  beforeAll(async () => {
    // Get mongodb memory server url from env
    connection = await dbLoader(process.env.MONGO_URL);
    database = new GameDatabase();
    // Get JWT auth token
    token = await getAuthToken();
  });

  beforeEach(async () => {
    await database.deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  test('Should return a game on addGame success', async () => {
    const res = await request(app)
      .post('/api/v1/game')
      .send({
        title: 'Game test title',
        rating: 4.2,
        summary: 'Game test summary',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const game = res.body.data;

    expect(game.title).toBe('Game test title');
    expect(game.rating).toBe(4.2);
    expect(game.summary).toBe('Game test summary');
  });
});
