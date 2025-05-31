import { instance } from "../axios-instance";

export const getOrders = async (
  filters: {
    search: string;
    status: string;
  },
  token: string
) => {
  const params = new URLSearchParams();
  if (filters.search.length > 0) {
    params.set("search", filters.search);
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
