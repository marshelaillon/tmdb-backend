import { Request, Response } from 'express';
import UserService from '../services/userService';
import {
  CreateUserRequest,
  CreateUserResponse,
} from '../interfaces/userInterfaces';

async function registerUser(
  { body }: Request<{}, {}, CreateUserRequest>,
  res: Response
): Promise<Response<CreateUserResponse>> {
  try {
    const newUserData = body;
    const response: CreateUserResponse = await UserService.registerUser(
      newUserData
    );
    return res.json(response);
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: (error as Error).message,
    });
  }
}

async function login({ body }: Request, res: Response) {
  try {
    const { user_email, user_password } = body;
    const response = await UserService.login({ user_email, user_password });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
}

async function addFavorite({ body }: Request, res: Response) {
  try {
    const response = await UserService.addFavorite(
      res.locals.user.user_favorites,
      res.locals.user.user_id,
      body
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json({ ok: false, data: null });
  }
}

async function updateUser({ body }: Request, res: Response) {
  try {
    const response = await UserService.updateUser(
      res.locals.user.user_id,
      body
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json({ ok: false, data: null });
  }
}

async function removeFavorite({ body }: Request, res: Response) {
  try {
    const response = await UserService.removeFavorite(
      res.locals.user.user_favorites,
      res.locals.user.user_id,
      body
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json({ ok: false, data: null, msg: (error as Error).message });
  }
}

async function getFavorites(_: Request, res: Response) {
  try {
    const response = await UserService.getFavorites(
      res.locals.user.user_favorites
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, data: null, msg: (error as Error).message });
  }
}

export default {
  registerUser,
  login,
  updateUser,
  addFavorite,
  removeFavorite,
  getFavorites,
};
