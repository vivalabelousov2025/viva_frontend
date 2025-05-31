import type { AxiosResponse } from "axios";
import { instance } from "../axios-instance";
import type {
  ILoginRequest,
  ILoginResponse,
  IRefreshTokenRequest,
  IRegisterRequest,
  StatusOkDto,
} from "@/types";

export async function login(data: ILoginRequest): Promise<AxiosResponse<ILoginResponse>> {
  return await instance.post("/auth/login/", data);
}

export async function register(
  data: IRegisterRequest
): Promise<AxiosResponse<StatusOkDto>> {
  return await instance.post("/auth/register/", data);
}

export async function refreshToken(
  data: IRefreshTokenRequest
): Promise<AxiosResponse<ILoginResponse>> {
  return await instance.post("/auth/refresh/", data);
}
