import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";

export class AuthController {
  private service = new AuthService();

  register = async (req: Request, res: Response) => {
    const result = await this.service.register(req.body);
    return res.status(201).json(result);
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.service.login(email, password);
    return res.json(result);
  };
}
