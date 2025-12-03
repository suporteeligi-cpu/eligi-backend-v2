export class EmailChannel {
  async send(to: string, subject: string, message: string) {
    // Integração futura: SES, Mailgun, Nodemailer, SendGrid etc.
    console.log("📨 [EMAIL] Enviando email para:", to);
    return { success: true };
  }
}
