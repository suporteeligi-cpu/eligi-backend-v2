import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authRepository } from "../repository/auth.repository";

export const authService = {
  async register(data: any) {
    const existing = await authRepository.findUserByEmail(data.email);
    if (existing) throw new Error("Email já registrado");

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await authRepository.createUser({
      ...data,
      passwordHash,
    });

    return user;
  },

  async login(data: any) {
    const user = await authRepository.findUserByEmail(data.email);
    if (!user) throw new Error("Credenciais inválidas");

    const ok = await bcrypt.compare(data.password, user.passwordHash || "");
    if (!ok) throw new Error("Credenciais inválidas");

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    await authRepository.saveRefreshToken({
      userId: user.id,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { user, accessToken, refreshToken };
  },

  async refresh(token: string) {
    const stored = await authRepository.findRefreshToken(token);

    if (!stored) throw new Error("Refresh token inválido");

    const payload: any = jwt.verify(token, process.env.JWT_SECRET!);

    const newAccessToken = jwt.sign(
      { id: payload.id },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    return { accessToken: newAccessToken };
  }
};
