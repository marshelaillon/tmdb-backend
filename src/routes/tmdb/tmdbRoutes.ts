import { Router } from 'express';
import TMDBController from '../../controllers/tmdbController';

const router = Router();

router.get('/search/:type/:title', TMDBController.searchMovieOrTVSeriesByTitle);
router.get('/:type/:id', TMDBController.getMovieOrTVSeriesDetailsById);
router.get('/similar/:type/:id', TMDBController.getSimilarMovieOrTv);
router.get('/trending', TMDBController.getTrendingMoviesOrTvSeries);
router.get('/genres', TMDBController.getGenres);

export default router;
