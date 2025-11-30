import { Response } from "express";
import { AuthRequest } from "../../../middlewares/authMiddleware";
import { availabilityService } from "../service/availability.service";
import { availabilitySchema } from "../dto/availability.dto";

export const availabilityController = {

  async get(req: AuthRequest, res: Response) {
    try {
      const { providerId, serviceId, date } = availabilitySchema.parse(req.query);

      const result = await availabilityService.getAvailability(
        providerId,
        serviceId,
        date
      );

      return res.json(result);

    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
};
