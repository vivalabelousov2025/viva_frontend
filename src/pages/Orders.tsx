"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";
import { useOrders } from "@/lib/hooks/orders";
import { getCookie } from "@/lib/cookies";

const actions = [
  { text: "Назначена команда на проект", time: "1 час назад" },
  { text: "Подана заявка «Мобильный сайт»", time: "3 часа назад" },
  {
    text: "Обновлён трафик проекта «Электронная челентано »",
    time: "5 часов назад",
  },
  { text: "Создан проект «Электронная коммерция»", time: "Вчера" },
];

const STATUS_ORDER = {
  PENDING: "Новая",
  IN_PROGRESS: "В работе",
  COMPLETED: "Выполнена",
  REJECTED: "Отклонена",
};
const STATUS_ORDER_VALUES = Object.values(STATUS_ORDER);

console.log(STATUS_ORDER_VALUES);
interface Filters {
  search: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "REJECTED" | "";
}

export const Orders = () => {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "",
  });

  const { data, refetch } = useOrders(filters, getCookie("access_token") || "");

  useEffect(() => {
    refetch();
  }, [filters]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Мои заявки</h1>

      <Card>
        <CardContent className="py-4 space-y-2">
          <h2 className="font-semibold">Последние действия</h2>
          {actions.map((action, idx) => (
            <div key={idx} className="text-sm flex justify-between gap-4">
              <span className="truncate whitespace-nowrap overflow-hidden max-w-[70%]">
                {action.text}
              </span>
              <span className="text-gray-500 whitespace-nowrap">
                {action.time}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Заявки</div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {filters.status ? STATUS_ORDER[filters.status] : "Статус"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setFilters({ ...filters, status: "" })}
              >
                Все
              </DropdownMenuItem>
              {Object.entries(STATUS_ORDER).map(([key, value]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() =>
                    setFilters({ ...filters, status: key as Filters["status"] })
                  }
                >
                  {value}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            placeholder="Поиск..."
            className="w-48"
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            value={filters.search}
          />
        </div>
      </div>

      <div className="overflow-auto rounded-lg border">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2">Название</th>
              <th className="px-4 py-2">Дата начала работ</th>
              <th className="px-4 py-2">Дата окончания работ</th>
              <th className="px-4 py-2">Статус</th>
              <th className="px-4 py-2">Команда</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((order, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2">{order.title}</td>
                <td className="px-4 py-2">
                  {new Date(order.estimated_start_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {new Date(order.estimated_end_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <Badge
                    variant={
                      order.status === "PENDING"
                        ? "outline"
                        : order.status == "IN_PROGRESS"
                        ? "secondary"
                        : order.status == "REJECTED"
                        ? "destructive"
                        : "default"
                    }
                  >
                    {STATUS_ORDER[order.status]}
                  </Badge>
                </td>
                <td className="px-4 py-2">{order.team?.name || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
