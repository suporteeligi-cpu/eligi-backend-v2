import { UsersRepository } from "../repository/users.repository";
import { AppError } from "../../../core/errors/AppError";

export class UsersService {
  private repo = new UsersRepository();

  async createUser(data: any) {
    const exists = await this.repo.findAll();

    const emailAlreadyUsed = exists.some((u) => u.email === data.email);
    if (emailAlreadyUsed) {
      throw new AppError("E-mail já está cadastrado", 400);
    }

    return this.repo.create(data);
  }

  async getUser(id: string) {
    const user = await this.repo.findById(id);
    if (!user) throw new AppError("Usuário não encontrado", 404);

    return user;
  }

  async listUsers() {
    return this.repo.findAll();
  }

  async updateUser(id: string, data: any) {
    return this.repo.update(id, data);
  }

  async deleteUser(id: string) {
    await this.getUser(id); // valida existência antes
    return this.repo.delete(id);
  }
}
