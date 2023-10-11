import createServer from '../utils/server';
import request from 'supertest';

const app = createServer();

describe('GET /api/v1/tmdb/search/:type/:title', () => {
  it('should respond with a 200 status code', async () => {
    const { statusCode } = await request(app)
      .get('/api/v1/tmdb/search/movie/shrek')
      .send();
    expect(statusCode).toBe(200);
  });

  it('should respond with a 404 status code', async () => {
    const { statusCode } = await request(app)
      .get('/api/v1/tmdb/search/badtype/notexistingtitle')
      .send();
    expect(statusCode).toBe(404);
  });
});
