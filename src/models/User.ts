import { Favorite } from '../interfaces/userInterfaces';

export interface User {
  user_id: bigint;
  user_first_name: string;
  user_last_name: string;
  user_password: string;
  user_email: string;
  user_favorites: Favorite[];
}

export interface InputUser {
  user_first_name: string;
  user_last_name: string;
  user_password: string;
  user_password_confirm: string;
  user_email: string;
}
