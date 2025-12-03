import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../core/errors/AppError";

export function validate(schema: ZodSchema<any>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new AppError(
        result.error.errors.map((e) => e.message).join(", "),
        400
      );
    }

    next();
  };
}
