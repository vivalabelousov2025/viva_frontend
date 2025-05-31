import type { AxiosResponse } from "axios";
import { instance } from "../axios-instance";
import type { ILoginResponse } from "@/types/auth";

export async function login(
  email: string,
  password: string
): Promise<AxiosResponse<ILoginResponse>> {
  return await instance.post("/auth/login/", { email, password });
}
