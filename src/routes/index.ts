require('dotenv').config();
import { Router } from 'express';
import tmdbRouter from './tmdb/tmdbRoutes';
import userRouter from './user/userRoutes';

const router = Router();

router.use('/tmdb', tmdbRouter);
router.use('/user', userRouter);

export default router;
