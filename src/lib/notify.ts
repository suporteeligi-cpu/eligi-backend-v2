import { notificationService } from "../modules/notifications/service/notification.service";

export function notify(userId: string, type: string, title: string, message: string) {
  return notificationService.send({ userId, type, title, message });
}
