export interface CreateAvailabilityDTO {
  providerId: string;
  weekday: number; // 0-6
  start: string;  // "HH:mm"
  end: string;    // "HH:mm"
}

export interface CreateExceptionDTO {
  providerId: string;
  date: string;     // "YYYY-MM-DD"
  start: string;    // "HH:mm"
  end: string;      // "HH:mm"
  reason?: string;
}

export interface UpdateAvailabilityDTO {
  start?: string;
  end?: string;
}
