import type { IOrder } from "@/types/order";
import { instance } from "../axios-instance";

export const getOrders = async (
  filters: {
    search: string;
    status: string;
  },
  token: string
): Promise<IOrder[]> => {
  const params = new URLSearchParams();
  if (filters.search.length > 0) {
    params.set("search", filters.search);
    params.set("field", "title");
  }
  if (filters.status.length > 0) {
    params.set("status", filters.status);
  }
  const response = await instance.get(`/orders/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
  return response.data;
};

export const createOrder = async (order: IOrder, token: string) => {
  const response = await instance.post(`/orders/`, order, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
