import { Request, Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { businessService } from "../service/business.service";
import { createBusinessSchema, updateAddressSchema, updateSettingsSchema } from "../dto/business.dto";

export const businessController = {
  async create(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const data = createBusinessSchema.parse(req.body);

      const business = await businessService.createBusiness(ownerId, data);
      return res.status(201).json(business);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async me(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const data = await businessService.getMyBusiness(ownerId);
      return res.json(data);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async update(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const business = await businessService.updateBusiness(ownerId, req.body);
      return res.json(business);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async updateAddress(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const data = updateAddressSchema.parse(req.body);
      const address = await businessService.updateAddress(ownerId, data);
      return res.json(address);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async updateSettings(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const data = updateSettingsSchema.parse(req.body);
      const settings = await businessService.updateSettings(ownerId, data);
      return res.json(settings);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
};
