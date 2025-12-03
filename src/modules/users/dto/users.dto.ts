export interface CreateUserDTO {
  name: string;
  email: string;
  password?: string;
  role: "client" | "provider" | "business_owner" | "admin";
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  role?: string;
}
