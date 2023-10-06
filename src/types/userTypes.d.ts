export interface CreateUserRequest {
  user_email: string;
  user_password: string;
  user_password_confirm?: string;
  user_first_name: string;
  user_last_name: string;
}

export interface CreateUserResponse {
  ok: boolean;
  data?: any;
  msg?: string;
}

export interface LoginUserRequest {
  user_email: string;
  user_password: string;
}
