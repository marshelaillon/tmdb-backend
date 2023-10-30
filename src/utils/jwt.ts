import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

export function generateJwt(
  userId: string,
  userEmail: string,
  secret: Secret = process.env.JWT_SECRET!
): string {
  const token = jwt.sign({ user_id: userId, user_email: userEmail }, secret, {
    expiresIn: '1 days',
  });
  return token;
}

export function verifyJwt(token: string, secret: string): JwtPayload {
  const decoded = jwt.verify(token, secret) as JwtPayload;
  return decoded;
}
