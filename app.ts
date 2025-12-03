import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { router } from "./src/routes/index";
import { errorMiddleware } from "./src/middlewares/error.middleware";
import { env } from "./src/config/env/";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Segurança
app.use(helmet());

// Logs
app.use(morgan("dev"));

// CORS
app.use(cors({
  origin: env.CORS_ORIGIN || "*"
}));

// Rotas principais
app.use("/api", router);

// Tratamento de erros
app.use(errorMiddleware);
