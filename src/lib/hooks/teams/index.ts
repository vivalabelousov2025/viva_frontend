import { useMutation, useQuery } from "@tanstack/react-query";
import { changeOrderTeam, getTeams } from "@/api/teams";

export const useTeams = () => {
  return useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });
};

export const useMutationChangeOrderTeam = (token: string) => {
  return useMutation({
    mutationFn: (data: { orderId: string; teamId: string }) =>
      changeOrderTeam(data.orderId, data.teamId, token),
  });
};
