import { getOrders } from "@/api/orders";
import { useQuery } from "@tanstack/react-query";

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
