import type { AxiosResponse } from "axios";
import { instance } from "../axios-instance";
import type { IUser } from "@/types";

export async function getMe(token: string): Promise<AxiosResponse<IUser>> {
  return await instance.get("/users/me/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
