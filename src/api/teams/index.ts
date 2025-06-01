import type { ITeam } from "@/types/team";
import { instance } from "../axios-instance";

export const getTeams = async (): Promise<ITeam[]> => {
  const response = await instance.get("/teams/");
  return response.data;
};

export const changeOrderTeam = async (
  orderId: string,
  teamId: string,
  token: string
) => {
  const response = await instance.post(
    `/orders/change-team`,
    {
      order_id: orderId,
      team_id: teamId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
