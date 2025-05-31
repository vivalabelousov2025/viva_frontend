import { getOrderActions } from "@/api/order-actions";
import { useQuery } from "@tanstack/react-query";

export const useOrderActions = () => {
  return useQuery({
    queryKey: ["order-actions"],
    queryFn: () => getOrderActions(),
  });
};
