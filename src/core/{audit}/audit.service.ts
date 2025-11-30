import { prisma } from "../../lib/prisma";

export const audit = {
  async log(action: string, userId?: string, details?: any) {
    await prisma.auditLog.create({
      data: {
        action,
        userId,
        details: details ? JSON.stringify(details) : null
      }
    });
  }
};
