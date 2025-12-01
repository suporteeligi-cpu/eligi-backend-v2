import { Request, Response, NextFunction } from "express";

// Make `user` non-optional
export interface AuthRequest extends Request {
  user: { id: string; [k: string]: any };
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });
  const token = authHeader.split(" ")[1];

  try {
    // verify token and extract payload (replace with your verify logic)
    const payload = verifyToken(token); // implement this to your stack
    (req as AuthRequest).user = { id: payload.sub, ...payload };
    return next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

import { providerService } from "../service/provider.service";
import { createProviderSchema, updateProviderSchema, workingHoursSchema, breakSchema } from "../dto/provider.dto";

export const providerController = {
  async create(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const data = createProviderSchema.parse(req.body);
      const provider = await providerService.create(ownerId, data);
      return res.status(201).json(provider);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async list(req: AuthRequest, res: Response) {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" }); // guard
    const providers = await providerService.list(req.user.id);
    return res.json(providers);
  },

  async update(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const providerId = req.params.id;
      const data = updateProviderSchema.parse(req.body);
      const provider = await providerService.update(ownerId, providerId, data);
      return res.json(provider);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async setWorkingHours(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const providerId = req.params.id;
      const data = workingHoursSchema.parse(req.body);
      const result = await providerService.setWorkingHours(ownerId, providerId, data);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async addBreak(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const providerId = req.params.id;
      const data = breakSchema.parse(req.body);
      const result = await providerService.addBreak(ownerId, providerId, data);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
};
