import type { IOrderAction } from "@/types/order-action";
import { instance } from "../axios-instance";

export const getOrderActions = async (
  token: string
): Promise<IOrderAction[]> => {
  const response = await instance.get(`/orders-actions/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
