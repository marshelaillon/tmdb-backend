import tmdbService from '../services/tmdbService';
import {
  MediaType,
  MovieOrTvSeriesDetailsOk,
  SearchResultOk,
} from '../interfaces/tmdbInterfaces';
import {
  searchShrekDetailsResult,
  searchShrekResult,
  searchTrueDetectiveDetailsResult,
  searchTrueDetectiveResult,
} from '../data/tmdbResult';

describe('tmdb services', () => {
  it('search a movie and a tv series given two titles', async () => {
    expect.assertions(2);

    const movieType = 'movie' as MediaType;
    const tvType = 'tv' as MediaType;

    const movieTitle = 'shrek';
    const tvTitle = 'true detective';

    const expectedMovieSearchResult = searchShrekResult;
    const expectedTvSearchResult = searchTrueDetectiveResult;

    const movieResult: SearchResultOk =
      await tmdbService.searchMovieOrTvSeriesByTitle(movieType, movieTitle);
    const tvResult: SearchResultOk =
      await tmdbService.searchMovieOrTvSeriesByTitle(tvType, tvTitle);

    expect(movieResult).toEqual(expectedMovieSearchResult);
    expect(tvResult).toEqual(expectedTvSearchResult);
  });

  it('get a movie and a tv series details given two ids and types', async () => {
    expect.assertions(2);

    const movieType = 'movie' as MediaType;
    const tvType = 'tv' as MediaType;

    const movieTitleId = 808; // shrek id
    const tvTitleId = 46648; // true detective id

    const expectedMovieSearchResult = searchShrekDetailsResult;
    const expectedTvSearchResult = searchTrueDetectiveDetailsResult;

    const movieResult: MovieOrTvSeriesDetailsOk =
      await tmdbService.getMovieOrTvSeriesDetailsById(movieType, movieTitleId);
    const tvResult: MovieOrTvSeriesDetailsOk =
      await tmdbService.getMovieOrTvSeriesDetailsById(tvType, tvTitleId);

    expect(movieResult).toEqual(expectedMovieSearchResult);
    expect(tvResult).toEqual(expectedTvSearchResult);
  });

  /* it('getTrendingMoviesOrTvSeries');
  it('getSimilarMovieOrTv');
  it('getGenres'); */
});
