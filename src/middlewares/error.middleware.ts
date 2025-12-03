import { Request, Response, NextFunction } from "express";
import { AppError } from "../core/errors/AppError";

export function errorMiddleware(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      status: "error",
      message: err.message
    });
  }

  console.error(err);

  return res.status(500).json({
    status: "error",
    message: "Erro interno no servidor"
  });
}
