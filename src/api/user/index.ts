import { instance } from "../axios-instance";
import type { AxiosResponse } from "axios";
import type { IUser } from "@/types";

export const getMe = async (token: string): Promise<AxiosResponse<IUser>> => {
  return await instance.get("/users/me/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
