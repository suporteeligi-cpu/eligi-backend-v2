export const NotificationTemplates = {
  appointment_confirmed: (data: any) =>
    `Seu horário foi confirmado com ${data.providerName} às ${data.time}.`,
  
  appointment_cancelled: (data: any) =>
    `Seu horário com ${data.providerName} foi cancelado.`,

  payment_received: (data: any) =>
    `Seu pagamento de R$${data.amount} foi confirmado.`,

  custom: (data: any) => data.message,
};
