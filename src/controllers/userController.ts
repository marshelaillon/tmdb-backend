import { Request, Response } from 'express';
import UserService from '../services/userService';
import { CreateUserRequest, CreateUserResponse } from '../types/userTypes';

const userService = new UserService();

export default class UserController {
  public async registerUser(
    { body }: Request<{}, {}, CreateUserRequest>,
    res: Response
  ): Promise<Response<CreateUserResponse>> {
    try {
      delete body.user_password_confirm;
      const newUserData = body;
      const response: CreateUserResponse = await userService.registerUser(
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

  public async login({ body }: Request, res: Response) {
    try {
      const { user_email, user_password } = body;
      const response = await userService.login({ user_email, user_password });
      res.json(response);
    } catch (error) {
      console.log(error);
    }
  }

  public async addFavorite({ body }: Request, res: Response) {
    try {
      const response = await userService.addFavorite(
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

  public async updateUser({ body }: Request, res: Response) {
    try {
      const response = await userService.updateUser(
        res.locals.user.user_id,
        body
      );
      res.json(response);
    } catch (error) {
      console.log(error);
      res.json({ ok: false, data: null });
    }
  }
}
