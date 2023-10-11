import { Request, Response } from 'express';
import TmdbService from '../services/tmdbService';
import { MediaType } from '../types/tmdbTypes';

const tmdbService = new TmdbService(process.env.TMDB_API_KEY!);

export default class TMDBController {
  public async searchMovieOrTVSeriesByTitle(
    { params }: Request,
    res: Response
  ) {
    try {
      const type = params.type as MediaType;
      const title = params.title;
      const response = await tmdbService.searchMovieOrTvSeriesByTitle(
        type,
        title
      );
      return res.json(response);
    } catch (error) {
      return res.status(404).json({ ok: false, msg: (error as Error).message });
    }
  }

  public async getMovieOrTVSeriesDetailsById(
    { params }: Request,
    res: Response
  ) {
    try {
      const type = params.type as MediaType;
      const id = Number(params.id);
      const response = await tmdbService.getMovieOrTvSeriesDetailsById(
        type,
        id
      );
      return res.json(response);
    } catch (error) {
      return res.status(404).json({ ok: false, msg: (error as Error).message });
    }
  }

  public async getTrendingMoviesOrTvSeries(_: Request, res: Response) {
    try {
      const response = await tmdbService.getTrendingMoviesOrTvSeries();
      return res.json(response);
    } catch (error) {
      return res.status(404).json({ ok: false, msg: (error as Error).message });
    }
  }

  public async getSimilarMovieOrTv({ params }: Request, res: Response) {
    try {
      const type = params.type as MediaType;
      const id = Number(params.id);
      const response = await tmdbService.getSimilarMovieOrTv(type, id);
      return res.json(response);
    } catch (error) {
      return res.status(404).json({ ok: false, msg: (error as Error).message });
    }
  }

  public async getGenres(_: Request, res: Response) {
    try {
      const response = await tmdbService.getGenres();
      return res.json(response);
    } catch (error) {
      return res.status(404).json({ ok: false, msg: (error as Error).message });
    }
  }
}
