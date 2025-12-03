export interface SendNotificationDTO {
  recipientId: string;
  type: "email" | "push" | "sms";
  title: string;
  message: string;
  data?: any;
}

export interface TemplateNotificationDTO {
  templateKey: string;      // ex: "appointment_confirmed"
  variables: Record<string, any>;
  recipientId: string;
  type: "email" | "push" | "sms";
}
