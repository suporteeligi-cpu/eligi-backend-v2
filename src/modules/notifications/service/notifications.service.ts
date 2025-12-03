import { NotificationRepository } from "../repository/notification.repository";
import { EmailChannel } from "../channels/email";
import { PushChannel } from "../channels/push";
import { SmsChannel } from "../channels/sms";
import { NotificationTemplates } from "../templates";
import { AppError } from "../../../core/errors/AppError";

export class NotificationService {
  private repo = new NotificationRepository();
  private email = new EmailChannel();
  private push = new PushChannel();
  private sms = new SmsChannel();

  async send(data: any) {
    const { recipientId, type, title, message } = data;

    let channel: any;

    if (type === "email") channel = this.email;
    if (type === "push") channel = this.push;
    if (type === "sms") channel = this.sms;

    if (!channel) throw new AppError("Tipo de notificação inválido.", 400);

    await channel.send(recipientId, title, message);

    // salva no banco
    return this.repo.create({
      recipientId,
      type,
      title,
      message
    });
  }

  async sendTemplate(data: any) {
    const templateFn = NotificationTemplates[data.templateKey];

    if (!templateFn) throw new AppError("Template não encontrado.", 404);

    const message = templateFn(data.variables);

    return this.send({
      recipientId: data.recipientId,
      type: data.type,
      title: data.templateKey,
      message
    });
  }

  async getUserNotifications(userId: string) {
    return this.repo.listByUser(userId);
  }
}
