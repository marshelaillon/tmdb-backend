import {
  SearchResultOk,
  MediaType,
  MovieOrTvSeriesDetailsOk,
  TrendingItemsOk,
  GenreResultOk,
  SimilarMoviesOrTvSeriesOk,
} from '../interfaces/tmdbInterfaces';
import { getTrailer } from '../utils/getTrailer';

const { TMDB_API_KEY } = process.env;

async function searchMovieOrTvSeriesByTitle(
  type: MediaType,
  title: string
): Promise<SearchResultOk> {
  try {
    const url = new URL(process.env.TMDB_BASE_URL!);
    url.pathname = `3/search/${type}`;
    url.searchParams.append('query', title);
    url.searchParams.append('api_key', TMDB_API_KEY!);
    const res = await fetch(url.toString());
    const data = await res.json();
    if (data?.success === false) throw new Error('Content type does not exist');
    else if (data?.results?.length === 0)
      throw new Error('Movie or TV Series not found');
    return { ok: true, data: { ...data, type } };
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function getMovieOrTvSeriesDetailsById(
  type: MediaType,
  id: number
): Promise<MovieOrTvSeriesDetailsOk> {
  try {
    let trailer;
    const url = new URL(process.env.TMDB_BASE_URL!);
    url.pathname = `3/${type}/${id}`;
    url.searchParams.append('append_to_response', 'videos');
    url.searchParams.append('api_key', TMDB_API_KEY!);
    const res = await fetch(url.toString());
    const data = await res.json();
    if (data?.success === false)
      throw new Error('The resource you requested could not be found');
    if (data?.videos?.length > 0) trailer = getTrailer(data.videos.results);
    return { ok: true, data: { ...data, type, trailer } };
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function getTrendingMoviesOrTvSeries(): Promise<TrendingItemsOk> {
  try {
    const url = new URL(process.env.TMDB_BASE_URL!);
    url.pathname = `3/trending/all/day`;
    url.searchParams.append('language', 'en-US');
    url.searchParams.append('api_key', TMDB_API_KEY!);
    const res = await fetch(url.toString());
    const data = await res.json();
    return { ok: true, data };
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function getSimilarMovieOrTv(
  type: MediaType,
  id: number
): Promise<SimilarMoviesOrTvSeriesOk> {
  try {
    const url = new URL(process.env.TMDB_BASE_URL!);
    url.pathname = `3/${type}/${id}/similar`;
    url.searchParams.append('language', 'en-US');
    url.searchParams.append('api_key', TMDB_API_KEY!);

    const res = await fetch(url);
    const data = await res.json();
    if (data?.success === false)
      throw new Error('The resource you requested could not be found');
    return { ok: true, data };
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function getGenres(): Promise<GenreResultOk> {
  try {
    const movieGenres = new URL(process.env.TMDB_BASE_URL!);
    const tvGenres = new URL(process.env.TMDB_BASE_URL!);
    movieGenres.pathname = `3/genre/movie/list`;
    movieGenres.searchParams.append('api_key', TMDB_API_KEY!);
    tvGenres.pathname = `3/genre/tv/list`;
    tvGenres.searchParams.append('api_key', TMDB_API_KEY!);
    const resMovieGenres = await fetch(movieGenres.toString());
    const resTvGenres = await fetch(tvGenres.toString());
    const movieGenresData = await resMovieGenres.json();
    const tvGenresData = await resTvGenres.json();
    const data = {
      movie_genres: movieGenresData?.genres,
      tv_genres: tvGenresData?.genres,
    };
    return { ok: true, data };
  } catch (error) {
    //console.log(error);
    throw new Error((error as Error).message);
  }
}

export default {
  searchMovieOrTvSeriesByTitle,
  getMovieOrTvSeriesDetailsById,
  getTrendingMoviesOrTvSeries,
  getSimilarMovieOrTv,
  getGenres,
};
