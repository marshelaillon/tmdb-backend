import { prismaMock } from '../prisma/singleton';
import { InputUser } from '../models/User';
import { ContentType, Favorite } from '../interfaces/favoritesInterfaces';
import userService, { excludedFields } from '../services/userService';
import { generateJwt } from '../utils/jwt';
import { compare, hash } from 'bcrypt';
import { omit } from 'lodash';

describe('user services', () => {
  it('should register a new user', async () => {
    expect.assertions(1);

    const inputUser: InputUser = {
      user_first_name: 'john',
      user_last_name: 'doe',
      user_password: 'Password123',
      user_password_confirm: 'Password123',
      user_email: 'johndoe1@gmail.com',
    };

    const createdUser = {
      user_id: 1n,
      user_first_name: 'john',
      user_last_name: 'doe',
      user_password: await hash(inputUser.user_password, 10),
      user_email: 'johndoe@gmail.com',
      user_favorites: [],
    };

    prismaMock.users.create.mockResolvedValue(createdUser);

    const expectedResult = {
      ok: true,
      data: omit(
        { ...createdUser, user_id: Number(createdUser.user_id) },
        excludedFields
      ),
    };

    const result = await userService.registerUser(inputUser);

    expect(result).toEqual(expectedResult);
  });

  it('should return an error: password do not match', async () => {
    expect.assertions(1);

    const passwordsDoNotMatchInput = {
      user_first_name: 'john',
      user_last_name: 'doe',
      user_password: 'Password1234',
      user_password_confirm: 'Password123',
      user_email: 'johndoe@gmail.com',
    };

    const expectedError = new Error('Passwords do not match');

    prismaMock.users.create.mockRejectedValue(expectedError);

    await userService
      .registerUser(passwordsDoNotMatchInput)
      .catch(err => expect(err).toEqual(expectedError));
  });

  it("should update user's data", async () => {
    expect.assertions(1);

    const inputUserData = {
      user_first_name: 'Jack',
      user_email: 'jackdoe@gmail.com',
    };

    const updatedUser = {
      user_id: BigInt(1),
      user_first_name: 'Jack',
      user_last_name: 'Doe',
      user_email: 'jackdoe@gmail.com',
      user_favorites: [],
      user_password: 'password123',
    };

    prismaMock.users.update.mockResolvedValue(updatedUser);

    const expectedResult = {
      ok: true,
      data: omit(
        { ...updatedUser, user_id: Number(updatedUser.user_id) },
        excludedFields
      ),
    };

    const result = await userService.updateUser(BigInt(1), inputUserData);

    expect(result).toEqual(expectedResult);
  });

  it('should log in a user with valid credentials', async () => {
    expect.assertions(1);

    let expectedResult;

    const loginData = {
      user_email: 'johndoe@gmail.com',
      user_password: 'Password123',
    };

    const user = {
      user_id: 1n,
      user_first_name: 'John',
      user_last_name: 'Doe',
      user_email: 'johndoe@gmail.com',
      user_password: await hash(loginData.user_password, 10),
      user_favorites: [],
    };

    prismaMock.users.findUnique.mockResolvedValue(user);

    const accessToken = generateJwt(String(user.user_id), user.user_email);
    const isUserAuthOk = await compare(
      loginData.user_password,
      user.user_password
    );

    if (isUserAuthOk) {
      expectedResult = {
        ok: true,
        data: {
          ...omit({ ...user, user_id: Number(user.user_id) }, excludedFields),
          accessToken,
        },
      };
    }

    const result = await userService.login(loginData);

    expect(result).toEqual(expectedResult);
  });

  it('should not log in a user with a non-existing email', async () => {
    expect.assertions(1);

    const loginData = {
      user_email: 'johndoe@gmail.com',
      user_password: 'Password123',
    };

    prismaMock.users.findUnique.mockResolvedValue(null);

    const expectedError = new Error('Invalid credentials');
    await userService
      .login(loginData)
      .catch(error => expect(error).toEqual(expectedError));
  });

  it('should not log in a user with a wrong password', async () => {
    expect.assertions(1);

    const correctPassword = 'Password123';

    const invalidLoginData = {
      user_email: 'johndoe@gmail.com',
      user_password: 'Password124',
    };

    const user = {
      user_id: BigInt(1),
      user_first_name: 'John',
      user_last_name: 'Doe',
      user_email: 'jackdoe@gmail.com',
      user_password: await hash(correctPassword, 10),
      user_favorites: [],
    };

    prismaMock.users.findUnique.mockResolvedValue(user);

    const isUserAuthOk = await compare(
      invalidLoginData.user_password,
      user.user_password
    );

    if (!isUserAuthOk) {
      const expectedError = new Error('Invalid credentials');
      await userService
        .login(invalidLoginData)
        .catch(error => expect(error).toEqual(expectedError));
    }
  });

  it("should add a favorite to user's favorites", async () => {
    expect.assertions(1);

    const currentFavorites: Favorite[] = [
      {
        id: 1151534,
        type: 'movie' as ContentType,
      },
    ];

    const userId = BigInt(1);

    const newFavoriteData: Favorite = {
      id: 1151535,
      type: 'tv' as ContentType,
    };

    prismaMock.users.update.mockResolvedValue({
      user_id: BigInt(1),
      user_first_name: 'John',
      user_last_name: 'Doe',
      user_email: 'johndoe@gmail.com',
      user_password: '',
      user_favorites: [
        {
          id: 1151534,
          type: 'movie',
        },
        {
          id: 1151535,
          type: 'tv',
        },
      ],
    });

    const expectedResult = {
      ok: true,
      data: [
        {
          id: 1151534,
          type: 'movie',
        },
        {
          id: 1151535,
          type: 'tv',
        },
      ],
    };

    const result = await userService.addFavorite(
      currentFavorites,
      userId,
      newFavoriteData
    );

    expect(result).toEqual(expectedResult);
  });

  it("should delete a user's favorite", async () => {
    expect.assertions(1);

    const currentFavorites: Favorite[] = [
      {
        id: 1151534,
        type: 'movie' as ContentType,
      },
      {
        id: 1151535,
        type: 'tv' as ContentType,
      },
    ];

    const userId = BigInt(1);

    const favoriteToDelete: Favorite = {
      id: 1151535,
      type: 'tv' as ContentType,
    };

    prismaMock.users.update.mockResolvedValue({
      user_id: BigInt(1),
      user_first_name: 'John',
      user_last_name: 'Doe',
      user_email: 'johndoe@gmail.com',
      user_password: '',
      user_favorites: [
        {
          id: 1151534,
          type: 'movie',
        },
      ],
    });

    const expectedResult = {
      ok: true,
      data: [
        {
          id: 1151534,
          type: 'movie' as ContentType,
        },
      ],
    };

    const result = await userService
      .removeFavorite(currentFavorites, userId, favoriteToDelete)
      .catch(err => console.log(err));

    expect(result).toEqual(expectedResult);
  });
});
