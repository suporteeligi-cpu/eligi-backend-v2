export class PushChannel {
  async send(title: string, message: string, userId: string) {
    // Firebase / OneSignal futuro
    console.log("📲 [PUSH] Enviando push para user:", userId);
    return { success: true };
  }
}
