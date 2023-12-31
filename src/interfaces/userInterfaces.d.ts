export interface CreateUserRequest {
  user_email: string;
  user_password: string;
  user_password_confirm: string;
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

export interface UserFavorite {
  id: number;
  type: string;
}

export interface UserData {
  accessToken: string;
  user_id: number;
  user_email: string;
  user_password: string;
  user_first_name: string;
  user_last_name: string;
  //user_favorites?: Prisma.JsonValue[];
  user_favorites: Prisma.JsonArray<UserFavorite>;
}

export interface LoginOk {
  ok: boolean;
  data: UserData;
}

export interface UserDataWithoutAccessToken
  extends Omit<UserData, 'accessToken'> {}

export interface UpdateOk {
  ok: boolean;
  data: UserDataWithoutAccessToken;
}

export interface Favorite {
  id: number;
  type: string;
}
