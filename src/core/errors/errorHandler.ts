import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message
    });
  }

  console.error("🔥 Internal Error:", err);

  return res.status(500).json({
    status: "error",
    message: "Erro interno no servidor."
  });
}
