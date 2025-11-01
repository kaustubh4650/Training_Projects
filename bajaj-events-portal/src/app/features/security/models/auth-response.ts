export class AuthResponse {
  email: string;
  role: string;
  token: string;
  refreshToken: string;
  message: string;
  success?: boolean;
}
