import { Router } from 'express';
import UserController from '../../controllers/userController';
import { validateInput } from '../../middlewares/validateInput';
import {
  registerUserSchema,
  loginUserSchema,
  userFavoriteSchema,
} from '../../schemas/user.schema';
import { deserializeUser } from '../../middlewares/deserializeUser';

const userController = new UserController();
const router = Router();

router
  .post('/', validateInput(registerUserSchema), userController.registerUser)
  .post('/login', validateInput(loginUserSchema), userController.login)
  .post(
    '/add-favorite',
    deserializeUser,
    validateInput(userFavoriteSchema),
    userController.addFavorite
  );

export default router;
