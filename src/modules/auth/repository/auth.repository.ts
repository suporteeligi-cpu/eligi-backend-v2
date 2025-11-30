import { prisma } from "../../../lib/prisma";

export const authRepository = {
  findUserByEmail: (email: string) =>
    prisma.user.findUnique({ where: { email } }),

  createUser: (data: any) =>
    prisma.user.create({
      data: {
        email: data.email,
        phone: data.phone,
        passwordHash: data.passwordHash,
        role: data.role,
      },
    }),

  saveRefreshToken: (data: any) =>
    prisma.refreshToken.create({
      data: {
        userId: data.userId,
        refreshToken: data.refreshToken,
        expiresAt: data.expiresAt,
      },
    }),

  findRefreshToken: (token: string) =>
    prisma.refreshToken.findFirst({
      where: { refreshToken: token },
    }),
};
