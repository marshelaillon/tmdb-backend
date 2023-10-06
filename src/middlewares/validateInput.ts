import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateInput =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });
      return next();
    } catch (error) {
      //console.log(error);
      if (error instanceof ZodError) {
        return res.status(400).json({
          ok: false,
          message: error.errors[0].message,
        });
      }
      return next(error);
    }
  };
