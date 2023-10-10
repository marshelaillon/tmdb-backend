import app from '..';
import request from 'supertest';

describe('GET /api/v1/tmdb/search/:type/:title', () => {
  test('It should respond with a 200 status code', async () => {
    const response = await request(app)
      .get(`/api/v1/tmdb/search/movie/shrek`)
      .send();
    console.log(response);
  });
});
