import { PrismaClient, Prisma } from '@prisma/client';
import { omit } from 'lodash';
import { hash, compare } from 'bcrypt';
import { CreateUserResponse, LoginUserRequest } from '../types/userTypes';
import { generateJwt } from '../utils/jwt';
import { Favorite } from '../types/favoritesTypes';
//import { Favorite } from '../types/favoritesTypes';

const prisma = new PrismaClient();

export const excludedFields = ['user_password'];

declare global {
  interface Error {
    code?: string;
  }
}

export default class UserService {
  public async registerUser(
    newUserData: Prisma.usersCreateInput
  ): Promise<CreateUserResponse> {
    try {
      const hashedPassword = await hash(newUserData.user_password, 10);
      const newUser = await prisma.users.create({
        data: { ...newUserData, user_password: hashedPassword },
      });
      if (newUser) {
        return {
          ok: true,
          data: omit(newUser, excludedFields),
        };
      }
      return { ok: false, data: null };
    } catch (error) {
      console.log(error);
      if ((error as Error)?.code === 'P2002') {
        return { ok: false, data: null, msg: 'Email is already in use' };
      }
      return { ok: false, data: null };
    }
  }

  public async login(loginData: LoginUserRequest): Promise<any> {
    try {
      let { user_email, user_password } = loginData;

      const user = await prisma.users.findUnique({
        where: {
          user_email,
        },
      });

      if (user) {
        const accessToken = generateJwt(String(user.user_id), user_email);
        const isUserAuthOk = await compare(user_password, user?.user_password);
        if (isUserAuthOk) {
          return {
            ok: true,
            data: { ...omit(user, excludedFields), accessToken },
          };
        }
        return { ok: false, data: null };
      }

      return { ok: false, data: null };
    } catch (error) {
      //console.log(error);
      return { ok: false, data: null };
    }
  }

  public async addFavorite(
    currentFavorites: Favorite[],
    userId: bigint,
    newFavoriteData: Favorite
  ): Promise<any> {
    try {
      const existingFavorite = currentFavorites.find(
        favorite =>
          favorite.id === newFavoriteData.id &&
          favorite.type === newFavoriteData.type
      );

      if (existingFavorite) {
        return {
          ok: false,
          msg: 'Favorite already exists',
          data: null,
        };
      }

      const updatedUser = await prisma.users.update({
        where: {
          user_id: userId,
        },
        data: {
          user_favorites: {
            push: {
              id: newFavoriteData.id,
              type: newFavoriteData.type,
            },
          },
        },
      });

      if (updatedUser) {
        return {
          ok: true,
          data: updatedUser.user_favorites,
          //user_id: Number(updatedUser),
        };
      }
      return { ok: false, data: null };
    } catch (error) {
      //console.log(error);
      return { ok: false, data: null };
    }
  }
}
