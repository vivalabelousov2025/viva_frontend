import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useMutationOrder } from "@/lib/hooks/orders";
import { getCookie } from "@/lib/cookies";
import { useState } from "react";
import type { IOrder } from "@/types/order";
import { useNavigate } from "react-router-dom";

export const OrderForm = () => {
  const navigate = useNavigate();
  const { mutate } = useMutationOrder(getCookie("access_token")!);
  const [order, setOrder] = useState<Partial<IOrder>>({
    title: "",
    description: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(order as IOrder);
    navigate("/orders");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-center">Подать заявку</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="orderName">Название проекта</Label>
              <Input
                id="orderName"
                type="text"
                placeholder="Введите название"
                required
                value={order.title}
                onChange={(e) => setOrder({ ...order, title: e.target.value })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="orderDesc">Описание</Label>
              <Textarea
                id="orderDesc"
                placeholder="Введите описание"
                className="h-[150px]"
                required
                value={order.description}
                onChange={(e) =>
                  setOrder({ ...order, description: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full">
                Отправить
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
