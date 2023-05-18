import request from 'supertest';
import app from '../../../src/main/app.js';

describe('Cors Middleware', () => {
  test('Should enable cors', async () => {
    app.get('/test_cors', (req, res) => {
      res.send(req.body);
    });
    await request(app).get('/test_body_parser').expect('access-control-allow-origin', '*');
  });
});
