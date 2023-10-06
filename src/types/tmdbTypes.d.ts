export interface MovieOrTVSerie {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface SearchResult {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null | string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  type: string;
}

export enum MediaType {
  TV = 'tv',
  MOVIE = 'movie',
}

export interface SearchResultOk {
  ok: boolean;
  data: SearchResult;
}

export interface SearchResultError {
  ok: boolean;
  data: null;
}

//* GET MOVIE/TV SERIES DETAILS *//

export interface MovieOrTvSeriesDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: Videos;
  trailer: string;
  type: ContentType;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Videos {
  results: VideoResult[];
}

export interface VideoResult {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
}

export interface MovieOrTvSeriesDetailsOk {
  ok: boolean;
  data: MovieOrTvSeriesDetails;
}

export interface MovieOrTvSeriesDetailsError {
  ok: boolean;
  data: null;
}

//* TRENDING *//

export interface TrendingItems {
  page: number;
  results: TrendingItem[];
  total_pages: number;
  total_results: number;
}

export interface TrendingItem {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title?: string;
  original_language: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: MediaType;
  genre_ids: number[];
  popularity: number;
  release_date?: Date;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  original_name?: string;
  first_air_date?: Date;
  origin_country?: string[];
}

export interface TrendingItemsOk {
  ok: boolean;
  data: TrendingItems;
}

export interface TrendingItemsError {
  ok: boolean;
  data: null;
}

//* GENRES */

export interface GenreResult {
  movie_genres: Genre[];
  tv_genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreResultOk {
  ok: boolean;
  data: GenreResult;
}

export interface GenreResultError {
  ok: boolean;
  data: null;
}
