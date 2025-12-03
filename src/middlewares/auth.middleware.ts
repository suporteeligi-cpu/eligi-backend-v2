import { Request, Response, NextFunction } from "express";
import { AppError } from "../core/errors/AppError";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError("Token não informado", 401);

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch {
    throw new AppError("Token inválido", 401);
  }
}
