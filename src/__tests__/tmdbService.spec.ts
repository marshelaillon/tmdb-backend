import tmdbService from '../services/tmdbService';
import {
  MediaType,
  MovieOrTvSeriesDetailsOk,
  SearchResultOk,
} from '../interfaces/tmdbInterfaces';

describe('tmdb services', () => {
  it('search a movie and a tv series given a title for each media type', async () => {
    expect.assertions(2);

    const movieType = 'movie' as MediaType;
    const tvType = 'tv' as MediaType;

    const movieTitle = 'shrek';
    const tvTitle = 'true detective';

    const movieResult: SearchResultOk =
      await tmdbService.searchMovieOrTvSeriesByTitle(movieType, movieTitle);
    const tvResult: SearchResultOk =
      await tmdbService.searchMovieOrTvSeriesByTitle(tvType, tvTitle);

    expect(movieResult.ok).toEqual(true);
    expect("data" in tvResult).toEqual(true);
  });

  it('get a movie and a tv series details given an id and a type for each media type', async () => {
    expect.assertions(2);

    const movieType = 'movie' as MediaType;
    const tvType = 'tv' as MediaType;

    const movieTitleId = 808; // shrek id
    const tvTitleId = 46648; // true detective id

    const movieResult: MovieOrTvSeriesDetailsOk =
      await tmdbService.getMovieOrTvSeriesDetailsById(movieType, movieTitleId);
    const tvResult: MovieOrTvSeriesDetailsOk =
      await tmdbService.getMovieOrTvSeriesDetailsById(tvType, tvTitleId);

    expect(movieResult.ok).toEqual(true);
    expect('data' in tvResult).toEqual(true);
  });

  it('get trending movies and tv series', async () => {
    expect.assertions(2);

    const result = await tmdbService.getTrendingMoviesOrTvSeries();

    expect(result.ok).toBe(true);
    expect(result.data.results.length).toBeGreaterThan(0);
  });

  it('get similar movie or tv series results for a given movie and tv series id', async () => {
    expect.assertions(4);

    const movieType = 'movie' as MediaType;
    const tvType = 'tv' as MediaType;

    const movieTitleId = 808; // shrek id
    const tvTitleId = 46648; // true detective id

    const movieResult = await tmdbService.getSimilarMovieOrTv(
      movieType,
      movieTitleId
    );
    const tvResult = await tmdbService.getSimilarMovieOrTv(tvType, tvTitleId);

    expect(movieResult.ok).toBe(true);
    expect(movieResult.data.results.length).toBeGreaterThan(0);

    expect(tvResult.ok).toBe(true);
    expect(tvResult.data.results.length).toBeGreaterThan(0);
  });

  it('get all movie and tv series genres', async () => {
    expect.assertions(3);

    const genres = await tmdbService.getGenres();

    expect(genres.ok).toBe(true);
    expect(genres.data?.movie_genres.length).toBeGreaterThan(0);
    expect(genres.data?.tv_genres.length).toBeGreaterThan(0);
  });
});
