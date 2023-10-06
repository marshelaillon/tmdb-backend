import jwt, { Secret } from 'jsonwebtoken';

export function generateJwt(
  userId: string,
  userEmail: string,
  secret: Secret = process.env.JWT_SECRET!
): any {
  try {
    const token = jwt.sign({ user_id: userId, user_email: userEmail }, secret, {
      expiresIn: '1 days',
    });
    return token;
  } catch (error) {
    console.log(error);
  }
}

export function verifyJwt(token: string, secret: string): any {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return null;
  }
}
