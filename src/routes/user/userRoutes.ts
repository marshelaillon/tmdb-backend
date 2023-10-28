import { Router } from 'express';
import UserController from '../../controllers/userController';
import { validateInput } from '../../middlewares/validateInput';
import {
  registerUserSchema,
  loginUserSchema,
  userFavoriteSchema,
  updateUserSchema,
} from '../../schemas/user.schema';
import { deserializeUser } from '../../middlewares/deserializeUser';

const router = Router();

router
  .post('/', validateInput(registerUserSchema), UserController.registerUser)
  .post('/login', validateInput(loginUserSchema), UserController.login)
  .put(
    '/',
    deserializeUser,
    validateInput(updateUserSchema),
    UserController.updateUser
  )
  .post(
    '/add-favorite',
    deserializeUser,
    validateInput(userFavoriteSchema),
    UserController.addFavorite
  )
  .delete(
    '/remove-favorite',
    deserializeUser,
    validateInput(userFavoriteSchema),
    UserController.removeFavorite
  );

export default router;
