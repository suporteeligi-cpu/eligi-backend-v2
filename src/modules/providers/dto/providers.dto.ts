export interface CreateProviderDTO {
  userId: string;       // referência ao usuário
  businessId: string;   // referência ao negócio
  name: string;
  bio?: string;
  avatarUrl?: string;
  specialization?: string;
  visible?: boolean;
}

export interface UpdateProviderDTO {
  name?: string;
  bio?: string;
  avatarUrl?: string;
  specialization?: string;
  visible?: boolean;
}
