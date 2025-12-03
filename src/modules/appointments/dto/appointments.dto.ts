export interface CreateAppointmentDTO {
  businessId: string;
  providerId: string;
  clientId: string;
  serviceId: string;
  date: string;      // ISO
  startTime: string; // "HH:mm"
  endTime: string;   // "HH:mm"
  notes?: string;
}

export interface UpdateAppointmentDTO {
  providerId?: string;
  serviceId?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  notes?: string;
  status?: "pending" | "confirmed" | "cancelled" | "completed";
}
