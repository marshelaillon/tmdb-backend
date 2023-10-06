import { Router } from 'express';
import TMDBController from '../../controllers/tmdbController';

const tmdbController = new TMDBController();
const router = Router();

router.get('/search/:type/:title', tmdbController.searchMovieOrTVSeriesByTitle);
router.get('/:type/:id', tmdbController.getMovieOrTVSeriesDetailsById);
router.get('/similar/:type/:id', tmdbController.getSimilarMovieOrTv);
router.get('/trending', tmdbController.getTrendingMoviesOrTvSeries);
router.get('/genres', tmdbController.getGenres);

export default router;
