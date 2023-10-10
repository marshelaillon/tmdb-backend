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
      if (body.user_password === body.user_password_confirm) {
        delete body.user_password_confirm;
        const newUserData = body;
        const response: CreateUserResponse = await userService.registerUser(
          newUserData
        );
        return res.json(response);
      } else {
        return res.json({
          ok: false,
          data: null,
          msg: 'Passwords do not match',
        } as CreateUserResponse);
      }
    } catch (error) {
      console.log('Error controller:', error);
      return res.status(500).json({
        ok: false,
        msg: 'Error trying to register a new user',
      } as CreateUserResponse);
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
