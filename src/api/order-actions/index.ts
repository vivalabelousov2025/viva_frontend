import { instance } from "../axios-instance";

export const getOrderActions = async (): Promise<IOrderAction[]> => {
  const response = await instance.get(`/order-actions/`);
  return response.data;
};