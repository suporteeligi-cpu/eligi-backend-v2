import { availabilityRepository } from "../repository/availability.repository";

export const availabilityService = {

  async getAvailability(providerId: string, serviceId: string, dateStr: string) {
    const date = new Date(dateStr + "T00:00:00");

    const weekday = date.getDay();

    const working = await availabilityRepository.getWorkingHours(providerId, weekday);
    if (!working) return [];

    const service = await availabilityRepository.getService(serviceId);
    if (!service) throw new Error("Serviço não encontrado");

    const breaks = await availabilityRepository.getBreaks(providerId, date);

    const dayStart = new Date(`${dateStr}T${working.start}`);
    const dayEnd   = new Date(`${dateStr}T${working.end}`);

    const durationMs = service.durationMin * 60000;

    // criar slots a cada 15 minutos
    const interval = 15 * 60000;
    let slots: Date[] = [];

    for (let time = dayStart.getTime(); time + durationMs <= dayEnd.getTime(); time += interval) {
      slots.push(new Date(time));
    }

    // remover por pausas
    for (const br of breaks) {
      const brStart = new Date(`${dateStr}T${br.start}`);
      const brEnd = new Date(`${dateStr}T${br.end}`);
      
      slots = slots.filter(slot => {
        const endSlot = new Date(slot.getTime() + durationMs);
        return !(slot < brEnd && endSlot > brStart);
      });
    }

    // remover por agendamentos
    const appointments = await availabilityRepository.getAppointments(
      providerId,
      dayStart,
      dayEnd
    );

    for (const appt of appointments) {
      slots = slots.filter(slot => {
        const endSlot = new Date(slot.getTime() + durationMs);
        return !(slot < appt.end && endSlot > appt.start);
      });
    }

    // formatar saída amigável
    return slots.map(s => ({
      start: s,
      end: new Date(s.getTime() + durationMs)
    }));
  }
};
