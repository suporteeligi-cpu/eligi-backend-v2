export interface CreateBusinessDTO {
  name: string;
  description?: string;
  category?: string;
  ownerId: string;
  phone?: string;
  cnpj?: string;
  address?: {
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface UpdateBusinessDTO {
  name?: string;
  description?: string;
  phone?: string;
  category?: string;
  cnpj?: string;
}
