import { notificationRepository } from "../repository/notification.repository";

export const notificationService = {

  async send(data: any) {
    // 1. Buscar template (opcional)
    let template = await notificationRepository.getTemplate(data.type);

    const title = template?.pushTemplate ?? data.title;
    const message = template?.smsTemplate ?? data.message;

    // 2. Criar notificação interna
    const notification = await notificationRepository.create({
      userId: data.userId,
      type: data.type,
      title,
      message,
      read: false,
    });

    // FUTURO: enviar push / e-mail / sms
    // ex: pushService.send(data.userId, title, message);

    return notification;
  },

  async list(userId: string) {
    return notificationRepository.listByUser(userId);
  },

  async markAsRead(notificationId: string) {
    return notificationRepository.markAsRead(notificationId);
  }
};
