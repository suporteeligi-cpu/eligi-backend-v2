import { AuthRequest } from "../../../middlewares/auth.middleware";
import { Response } from "express";
import { adminService } from "../service/admin.service";

export const adminController = {

  async list(req: AuthRequest, res: Response) {
    try {
      const result = await adminService.listBusinesses(req.user);
      return res.json(result);

    } catch (err: any) {
      res.status(403).json({ message: err.message });
    }
  },

  async suspend(req: AuthRequest, res: Response) {
    try {
      const result = await adminService.suspend(req.user, req.params.id);
      return res.json(result);

    } catch (err: any) {
      res.status(403).json({ message: err.message });
    }
  },

  async activate(req: AuthRequest, res: Response) {
    try {
      const result = await adminService.activate(req.user, req.params.id);
      return res.json(result);

    } catch (err: any) {
      res.status(403).json({ message: err.message });
    }
  },

  async delete(req: AuthRequest, res: Response) {
    try {
      const result = await adminService.remove(req.user, req.params.id);
      return res.json(result);

    } catch (err: any) {
      res.status(403).json({ message: err.message });
    }
  }
};
