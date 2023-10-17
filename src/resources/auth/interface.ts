

export type LoginResponse = {
  access_token: string;
  token_type: string;
};

export type AuthInfoResponse = {
  status: string;
  userId: string;
}

export interface AuthRepository {
  login(username: string, password: string): Promise<LoginResponse>;
  me(token: string): Promise<AuthInfoResponse>;
  register(username: string, password: string, userId: string, role: string): Promise<boolean>;
}