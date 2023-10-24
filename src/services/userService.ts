import { omit } from 'lodash';
import { hash, compare } from 'bcrypt';
import { LoginUserRequest, CreateUserResponse } from '../types/userTypes';
import { generateJwt } from '../utils/jwt';
import { Favorite } from '../types/favoritesTypes';
import { Prisma } from '@prisma/client';
import prisma from '../prisma/client';
import arePasswordsEqual from '../utils/checkPasswords';

export const excludedFields = ['user_password'];

declare global {
  interface Error {
    code?: string;
  }
}

/* type UserCreateInputWithPasswordConfirmation = Prisma.usersCreateInput & {
  user_password_confirm: string;
}; */

interface UserCreateInputWithPasswordConfirmation
  extends Prisma.usersCreateInput {
  user_password_confirm: string;
}

async function registerUser(
  //newUserData: any
  newUserData: UserCreateInputWithPasswordConfirmation
): Promise<CreateUserResponse> {
  try {
    if (
      !arePasswordsEqual(
        newUserData.user_password,
        newUserData.user_password_confirm
      )
    )
      throw new Error('Passwords do not match');

    const salt = 10;
    const hashedPassword = await hash(newUserData.user_password, salt);

    const newUser = await prisma.users.create({
      data: {
        user_email: newUserData.user_email.toLowerCase(),
        user_first_name: newUserData.user_first_name.toLowerCase(),
        user_last_name: newUserData.user_last_name.toLowerCase(),
        user_password: hashedPassword,
      },
    });

    if (!newUser) {
      throw new Error("User couldn't be created");
    }

    return {
      ok: true,
      data: omit(
        { ...newUser, user_id: Number(newUser.user_id) },
        excludedFields
      ),
    };
  } catch (error) {
    console.log((error as Error).message);
    if ((error as Error)?.code === 'P2002') {
      throw new Error('Email is already in use');
    }
    throw new Error((error as Error).message);
  }
}

async function login(loginData: LoginUserRequest): Promise<any> {
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
          data: {
            ...omit({ ...user, user_id: Number(user.user_id) }, excludedFields),
            accessToken,
          },
        };
      }
      return { ok: false, data: null };
    }

    return { ok: false, data: null };
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
}

async function updateUser(userId: bigint, newUserData: any): Promise<any> {
  try {
    const updatedUser = await prisma.users.update({
      where: {
        user_id: userId,
      },
      data: newUserData,
    });

    if (updatedUser) {
      return {
        ok: true,
        data: omit(
          { ...updatedUser, user_id: Number(updatedUser.user_id) },
          excludedFields
        ),
      };
    }

    return { ok: false, data: null };
  } catch (error) {
    //console.log(error);
    return { ok: false, data: null };
  }
}

async function addFavorite(
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

export default {
  registerUser,
  login,
  updateUser,
  addFavorite,
};
