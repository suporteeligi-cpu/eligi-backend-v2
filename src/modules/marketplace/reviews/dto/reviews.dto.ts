export interface CreateReviewDTO {
  appointmentId: string;
  clientId: string;
  providerId: string;

  rating: number;   // 1–5
  comment?: string;
}
