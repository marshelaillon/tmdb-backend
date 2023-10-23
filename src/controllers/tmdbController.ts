import { Request, Response } from 'express';
import TmdbService from '../services/tmdbService';
import { MediaType } from '../types/tmdbTypes';

async function searchMovieOrTVSeriesByTitle(
  { params }: Request,
  res: Response
) {
  try {
    const type = params.type as MediaType;
    const title = params.title;
    const response = await TmdbService.searchMovieOrTvSeriesByTitle(
      type,
      title
    );
    return res.json(response);
  } catch (error) {
    return res.status(404).json({ ok: false, msg: (error as Error).message });
  }
}

async function getMovieOrTVSeriesDetailsById(
  { params }: Request,
  res: Response
) {
  try {
    const type = params.type as MediaType;
    const id = Number(params.id);
    const response = await TmdbService.getMovieOrTvSeriesDetailsById(type, id);
    return res.json(response);
  } catch (error) {
    return res.status(404).json({ ok: false, msg: (error as Error).message });
  }
}

async function getTrendingMoviesOrTvSeries(_: Request, res: Response) {
  try {
    const response = await TmdbService.getTrendingMoviesOrTvSeries();
    return res.json(response);
  } catch (error) {
    return res.status(404).json({ ok: false, msg: (error as Error).message });
  }
}

async function getSimilarMovieOrTv({ params }: Request, res: Response) {
  try {
    const type = params.type as MediaType;
    const id = Number(params.id);
    const response = await TmdbService.getSimilarMovieOrTv(type, id);
    return res.json(response);
  } catch (error) {
    return res.status(404).json({ ok: false, msg: (error as Error).message });
  }
}

async function getGenres(_: Request, res: Response) {
  try {
    const response = await TmdbService.getGenres();
    return res.json(response);
  } catch (error) {
    return res.status(404).json({ ok: false, msg: (error as Error).message });
  }
}

export default {
  searchMovieOrTVSeriesByTitle,
  getMovieOrTVSeriesDetailsById,
  getTrendingMoviesOrTvSeries,
  getSimilarMovieOrTv,
  getGenres,
};
