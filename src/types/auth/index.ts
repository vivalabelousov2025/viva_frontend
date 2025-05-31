export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface IRefreshTokenRequest {
  refresh_token: string;
}
