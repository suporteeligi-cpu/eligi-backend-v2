import axios from "axios";
import { prisma } from "../../../lib/prisma";

export const webhookService = {
  async trigger(event: string, payload: any) {
    const hooks = await prisma.webhook.findMany({
      where: { active: true, events: { has: event } }
    });

    for (const hook of hooks) {
      try {
        await axios.post(hook.url, { event, payload });
      } catch (err: any) {
        console.log("Webhook failed:", hook.url, err?.response?.status ?? err?.message);
      }
    }
  }
};
