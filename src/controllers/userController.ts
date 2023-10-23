import { Request, Response } from 'express';
import UserService from '../services/userService';
import { CreateUserRequest, CreateUserResponse } from '../types/userTypes';

async function registerUser(
  { body }: Request<{}, {}, CreateUserRequest>,
  res: Response
): Promise<Response<CreateUserResponse>> {
  try {
    delete body.user_password_confirm;
    const newUserData = body;
    const response: CreateUserResponse = await UserService.registerUser(
      newUserData
    );
    return res.json(response);
  } catch (error) {
    console.log(error);
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

export default {
  registerUser,
  login,
  addFavorite,
  updateUser,
};
