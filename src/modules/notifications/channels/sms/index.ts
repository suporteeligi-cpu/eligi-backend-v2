export class SmsChannel {
  async send(phone: string, message: string) {
    // Integração Twilio futuramente
    console.log("📩 [SMS] Enviando SMS para:", phone);
    return { success: true };
  }
}
