import { getOrderActions } from "@/api/order-actions";
import { useQuery } from "@tanstack/react-query";

export const useOrderActions = (token: string) => {
  return useQuery({
    queryKey: ["order-actions"],
    queryFn: () => getOrderActions(token),
  });
};
