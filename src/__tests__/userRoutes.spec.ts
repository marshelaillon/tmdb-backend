import createServer from '../utils/server';
import request from 'supertest';

const app = createServer();
const baseUrl = '/api/v1/user';

import { MockContext, Context, createMockContext } from './context';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

const userInput = {
  user_first_name: 'john',
  user_last_name: 'doe',
  user_password: 'Password123',
  user_password_confirm: 'Password123',
  user_email: 'johndoe1@gmail.com',
};

const passwordsDoNotMatchInput = {
  user_first_name: 'john',
  user_last_name: 'doe',
  user_password: 'Password1234',
  user_password_confirm: 'Password123',
  user_email: 'johndoe@gmail.com',
};

describe('POST /api/v1/user', () => {
  it('should respond with a 200 status code for a valid new user register', async () => {
    const { statusCode } = await request(app).post(baseUrl).send(userInput);
    expect(statusCode).toBe(200);
  });

  it('should respond with a 400 status code for a valid new user register', async () => {
    const { statusCode } = await request(app)
      .post(baseUrl)
      .send(passwordsDoNotMatchInput);
    expect(statusCode).toBe(400);
  });
});
