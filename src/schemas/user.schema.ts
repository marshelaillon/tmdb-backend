import { number, object, string, TypeOf, z } from 'zod';

export enum MediaType {
  TV = 'tv',
  MOVIE = 'movie',
}

export const registerUserSchema = object({
  body: object({
    user_email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    user_password: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password must be more than 8 characters')
      .max(16, 'Password must be less than 16 characters'),
    user_password_confirm: string({
      required_error: 'Please confirm your password',
    }),
    user_first_name: string({
      required_error: 'First name is required',
    }),
    user_last_name: string({
      required_error: 'Last name is required',
    }),
  }).refine(data => data.user_password === data.user_password_confirm, {
    path: ['user_password_confirm'],
    message: 'Passwords do not match',
  }),
});

export const updateUserSchema = object({
  body: object({
    user_first_name: string({
      required_error: 'First name is required',
    }).optional(),
    user_last_name: string({
      required_error: 'Last name is required',
    }).optional(),
  }),
});

export const loginUserSchema = object({
  body: object({
    user_email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    user_password: string({
      required_error: 'Password is required',
    }).min(8, 'Invalid email or password'),
  }),
});

export const userFavoriteSchema = object({
  body: object({
    id: number({
      required_error: 'Id is required',
    }),
    type: z.optional(z.nativeEnum(MediaType)).refine(
      data => {
        // Validamos que el campo role sea un valor válido si está presente
        if (data !== undefined) {
          return Object.values(MediaType).includes(data);
        }
        return true; // Si es undefined, es válido
      },
      {
        message: 'Type must be either a tv or a movie',
        path: ['type'], // Campo al que se aplica el mensaje de error
      }
    ),
  }),
});

export type RegisterUserInput = Omit<
  TypeOf<typeof registerUserSchema>['body'],
  'user_password_confirm'
>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
