import { createOrder, getOrders } from "@/api/orders";
import type { IOrder } from "@/types/order";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useOrders = (
  filters: {
    search: string;
    status: string;
  },
  token: string
) => {
  return useQuery({
    queryKey: ["orders", filters],
    queryFn: () => getOrders(filters, token),
  });
};

export const useMutationOrder = (token: string) => {
  return useMutation({
    mutationFn: (order: IOrder) => createOrder(order, token),
  });
};
