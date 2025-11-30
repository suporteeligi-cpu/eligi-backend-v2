import { businessRepository } from "../../business/repository/business.repository";
import { providerRepository } from "../../providers/repository/provider.repository";
import { serviceRepository } from "../../services/service/service.repository";
import { appointmentRepository } from "../repository/appointment.repository";

export const appointmentService = {

  async create(ownerId: string, data: any) {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado");

    const provider = await providerRepository.findProviderById(data.providerId);
    if (!provider || provider.businessId !== business.id)
      throw new Error("Profissional não pertence ao negócio");

    const service = await serviceRepository.findById(data.serviceId);
    if (!service || service.businessId !== business.id)
      throw new Error("Serviço não pertence ao negócio");

    const start = new Date(data.start);
    const end = new Date(start.getTime() + service.durationMin * 60000);

    const weekday = start.getDay();

    // 1. Verificar se o horário está dentro da escala do barbeiro
    const working = await appointmentRepository.getProviderWorkingHours(provider.id, weekday);
    if (!working) throw new Error("Profissional não trabalha nesse dia");

    if (start < new Date(`${start.toDateString()} ${working.start}`) ||
        end > new Date(`${start.toDateString()} ${working.end}`)) {
      throw new Error("Horário fora do turno de trabalho");
    }

    // 2. Verificar folgas / bloqueios
    const breaks = await appointmentRepository.getProviderBreaks(provider.id, start);
    for (const br of breaks) {
      const brStart = new Date(`${start.toDateString()} ${br.start}`);
      const brEnd = new Date(`${start.toDateString()} ${br.end}`);

      if (start < brEnd && end > brStart) {
        throw new Error("Horário em período de folga do profissional");
      }
    }

    // 3. Verificar conflitos com outros agendamentos
    const conflicts = await appointmentRepository.findByProviderAndRange(provider.id, start, end);
    if (conflicts.length > 0) throw new Error("Profissional já possui agendamento nesse horário");

    // 4. Criar agendamento
    const appointment = await appointmentRepository.create({
      businessId: business.id,
      providerId: provider.id,
      serviceId: service.id,
      userId: data.userId,
      start,
      end,
      price: service.price,
      status: "scheduled",
    });

    // 5. Histórico
    await appointmentRepository.saveStatusHistory({
      appointmentId: appointment.id,
      newStatus: "scheduled"
    });

    return appointment;
  },

  async updateStatus(ownerId: string, id: string, status: any, reason?: string) {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado");

    const appointment = await appointmentRepository.getById(id);
    if (!appointment || appointment.businessId !== business.id)
      throw new Error("Agendamento não encontrado");

    await appointmentRepository.updateStatus(id, status);

    await appointmentRepository.saveStatusHistory({
      appointmentId: id,
      oldStatus: appointment.status,
      newStatus: status
    });

    if (status === "canceled") {
      await appointmentRepository.saveCancellation({
        appointmentId: id,
        reasonText: reason,
        canceledBy: "owner"
      });
    }

    return { id, status };
  },

  async listByBusiness(ownerId: string, date: any) {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado");

    return appointmentRepository.listByBusiness(business.id, date);
  }
};
  