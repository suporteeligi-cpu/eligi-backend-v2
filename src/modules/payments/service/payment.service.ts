import { businessRepository } from "../../business/repository/business.repository";
import { appointmentRepository } from "../../appointments/repository/appointment.repository";
import { paymentRepository } from "../repository/payment.repository";

export const paymentService = {

  async create(ownerId: string, data: any) {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado");

    const appointment = await appointmentRepository.getById(data.appointmentId);
    if (!appointment || appointment.businessId !== business.id)
      throw new Error("Agendamento não pertence ao seu negócio");

    // evitar pagamento duplicado
    const existingPayment = await paymentRepository.findByAppointment(data.appointmentId);
    if (existingPayment) throw new Error("Pagamento já registrado para esse agendamento");

    // registrar pagamento
    const payment = await paymentRepository.create({
      appointmentId: data.appointmentId,
      userId: appointment.userId,
      method: data.method,
      amount: data.amount,
      status: "paid",
      transactionIdGateway: null // futuro: id do gateway
    });

    // calcular repasse ao profissional
    const fee = data.amount * 0.03; // taxa padrão da plataforma (3%)
    const netAmount = data.amount - fee;

    const payout = await paymentRepository.createPayout({
      providerId: appointment.providerId,
      appointmentId: appointment.id,
      amount: data.amount,
      fee,
      netAmount,
      payoutDate: null // será liquidado no futuro
    });

    return { payment, payout };
  },

  async listPayments(ownerId: string) {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado");

    return paymentRepository.listPaymentsByBusiness(business.id);
  },

  async listPayouts(ownerId: string, providerId: string) {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado");

    return paymentRepository.listPayoutsByProvider(providerId);
  }
};
