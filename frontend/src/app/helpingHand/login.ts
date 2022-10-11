export interface Login {
  user_login?: string;
  user_email?: string;
  user_password: string;
}

export interface TokenResponse {
  user_id: number;
  isAdmin: boolean;
  token: string;
  error?: string;
}
