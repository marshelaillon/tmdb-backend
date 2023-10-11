import createServer from '../utils/server';
import request from 'supertest';

const app = createServer();
const baseUrl = '/api/v1/tmdb';
const movieType = 'movie';
const tvType = 'tv';

describe('GET /api/v1/tmdb/search/type/title', () => {
  it('should respond with a 200 status code for a valid movie/tv series', async () => {
    const movieTitle = 'the lord of the rings';
    const tvTitle = 'true detective';

    const movieResponse = await request(app)
      .get(`${baseUrl}/search/${movieType}/${movieTitle}`)
      .send();
    const tvResponse = await request(app)
      .get(`${baseUrl}/search/${tvType}/${tvTitle}`)
      .send();
    expect(movieResponse.statusCode).toBe(200);
    expect(tvResponse.statusCode).toBe(200);
  });

  it('should respond with a 404 status code for a non-existing movie/tv series or content type', async () => {
    const nonExistingType = 'tv-series';
    const movieTitle = 'the lord of the rings';

    const nonExistingTitle = '314{k34ñj1k341lh43g{asrg';
    const badTypeResponse = await request(app)
      .get(`${baseUrl}/search/${nonExistingType}/${movieTitle}`)
      .send();
    expect(badTypeResponse.statusCode).toBe(404);

    const nonExistingMovie = await request(app)
      .get(`${baseUrl}/search/movie/${nonExistingTitle}`)
      .send();
    expect(nonExistingMovie.statusCode).toBe(404);

    const nonExistingTv = await request(app)
      .get(`${baseUrl}/search/tv/${nonExistingTitle}`)
      .send();
    expect(nonExistingTv.statusCode).toBe(404);
  });
});

describe('GET /api/v1/tmdb/type/id', () => {
  it('should respond with a 200 status code for a valid movie/tv series id', async () => {
    const id = 120; // lord of the rings first movie id
    const existingIdResponse = await request(app)
      .get(`${baseUrl}/${movieType}/${id}`)
      .send();
    expect(existingIdResponse.statusCode).toBe(200);
  });

  it('should respond with a 404 status code for a non-existing movie/tv series id', async () => {
    const nonExistingId = 0;
    const nonExistingMovieIdResponse = await request(app)
      .get(`${baseUrl}/${movieType}/${nonExistingId}`)
      .send();
    expect(nonExistingMovieIdResponse.statusCode).toBe(404);

    const nonExistingTvIdResponse = await request(app)
      .get(`${baseUrl}/${tvType}/${nonExistingId}`)
      .send();
    expect(nonExistingTvIdResponse.statusCode).toBe(404);
  });
});

describe('GET /api/v1/tmdb/trending', () => {
  it('should respond with a 200 status code', async () => {
    const { statusCode } = await request(app).get(`${baseUrl}/trending`).send();
    expect(statusCode).toBe(200);
  });
});

describe('GET /api/v1/tmdb/similar/type/id', () => {
  const movieId = 120; // The lord of the rings first movie id
  const tvId = 46648; // True detective tv series id
  const invalidId = 0;

  it('should respond with a 200 status code for a valid movie id', async () => {
    const { statusCode } = await request(app)
      .get(`${baseUrl}/similar/${movieType}/${movieId}`)
      .send();
    expect(statusCode).toBe(200);
  });

  it('should respond with a 200 status code for a valid tv series id', async () => {
    const { statusCode } = await request(app)
      .get(`${baseUrl}/similar/${tvType}/${tvId}`)
      .send();
    expect(statusCode).toBe(200);
  });

  it('should respond with a 404 status code for a non-existing movie id', async () => {
    const { statusCode } = await request(app)
      .get(`${baseUrl}/similar/${movieType}/${invalidId}`)
      .send();
    expect(statusCode).toBe(404);
  });

  it('should respond with a 404 status code for a non-existing tv series id', async () => {
    const { statusCode } = await request(app)
      .get(`${baseUrl}/similar/${tvType}/${invalidId}`)
      .send();
    expect(statusCode).toBe(404);
  });
});

describe('GET /api/v1/tmdb/genres', () => {
  it('should respond with a 200 status code', async () => {
    const { statusCode } = await request(app).get(`${baseUrl}/genres`).send();
    expect(statusCode).toBe(200);
  });
});
