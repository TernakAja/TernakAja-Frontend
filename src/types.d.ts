export interface User {
  id: number;
  email: string;
  name: string | null;
  role: string;
  farm_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface ErrorResponse {
  error: string;
}