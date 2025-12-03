export interface CreateServiceDTO {
  businessId: string;
  name: string;
  description?: string;
  duration: number; // minutos
  price: number;
  category?: string;
  active?: boolean;
}

export interface UpdateServiceDTO {
  name?: string;
  description?: string;
  duration?: number;
  price?: number;
  category?: string;
  active?: boolean;
}
