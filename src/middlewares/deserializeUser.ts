import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { omit } from 'lodash';
import { excludedFields } from '../services/userService';
import { verifyJwt } from '../utils/jwt';

const prisma = new PrismaClient();

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | null | Response> => {
  try {
    let access_token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    }

    if (!access_token) {
      return res.status(401).json({
        ok: false,
        msg: 'You are not logged in',
      });
    }

    // Validate the access token
    const decoded = verifyJwt(access_token, process.env.JWT_SECRET!);

    if (!decoded) {
      return res.status(403).json({
        ok: false,
        msg: 'You are not authorized',
      });
    }

    // Check if the user still exist
    const user = await prisma.users.findUnique({
      where: {
        user_id: decoded.user_id,
      },
    });

    if (!user) {
      return res.status(403).json({
        ok: false,
        msg: 'User no longer exists',
      });
    }

    res.locals.user = omit(user, excludedFields);

    next();
  } catch (err: any) {
    next(err);
  }
};
