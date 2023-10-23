import { hash } from 'bcrypt';
import { prismaMock as prisma } from '../prisma/singleton';
import { User, InputUser } from '../models/User';
import userService from '../services/userService';
import { omit } from 'lodash';
import { excludedFields } from '../services/userService';

/* const passwordsDoNotMatchInput = {
  user_first_name: 'john',
  user_last_name: 'doe',
  user_password: 'Password1234',
  user_password_confirm: 'Password123',
  user_email: 'johndoe@gmail.com',
}; */

describe('user services', () => {
  it('should create a user', async () => {
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

    prisma.users.create.mockResolvedValue(createdUser);

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
});
