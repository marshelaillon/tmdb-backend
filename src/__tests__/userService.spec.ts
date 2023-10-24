import { compare, hash } from 'bcrypt';
import { prismaMock } from '../prisma/singleton';
import { User, InputUser } from '../models/User';
import userService from '../services/userService';
import { omit } from 'lodash';
import { excludedFields } from '../services/userService';
import { generateJwt } from '../utils/jwt';

describe('user services', () => {
  it('should create a user', async () => {
    expect.assertions(1);

    const inputUser: InputUser = {
      user_first_name: 'john',
      user_last_name: 'doe',
      user_password: 'Password123',
      user_password_confirm: 'Password123',
      user_email: 'johndoe1@gmail.com',
    };

    const createdUser: User = {
      user_id: BigInt(1),
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

  it('should update a user', async () => {
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

  it('should login a user with valid credentials', async () => {
    expect.assertions(1);

    let expectedResult;

    const loginData = {
      user_email: 'johndoe@gmail.com',
      user_password: 'Password123',
    };

    const user = {
      user_id: BigInt(1),
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
});