import { AuthRepository } from "../repository/auth.repository";
import { PasswordService } from "./password.service";
import { TokenService } from "./token.service";
import { AppError } from "../../../core/errors/AppError";

export class AuthService {
  private repo = new AuthRepository();
  private password = new PasswordService();
  private token = new TokenService();

  async register(data: any) {
    const exists = await this.repo.findByEmail(data.email);
    if (exists) throw new AppError("E-mail já está em uso.", 400);

    const hashed = await this.password.hash(data.password);

    const user = await this.repo.createUser({
      ...data,
      password: hashed
    });

    return {
      user,
      token: this.token.generate({ id: user.id })
    };
  }

  async login(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new AppError("Credenciais inválidas", 401);

    const isValid = await this.password.compare(password, user.password);
    if (!isValid) throw new AppError("Credenciais inválidas", 401);

    return {
      user,
      token: this.token.generate({ id: user.id })
    };
  }
}
