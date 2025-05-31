export interface IOrderAction {
  order_id: number;
  title: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "REJECTED";
  created_at: Date;
  updated_at: Date;
}
