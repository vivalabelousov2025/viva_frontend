import type { ITeam } from "../team";
import type { IUser } from "../user";

export interface IOrder {
  order_id: string;
  user?: IUser;
  team?: ITeam;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "REJECTED";
  total_price: number;
  estimated_start_date: Date;
  estimated_end_date: Date;
  created_at: Date;
  updated_at: Date;
}
