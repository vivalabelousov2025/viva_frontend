"use client";

import { useEffect, useState, useMemo } from "react";
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
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { ProjectCard } from "@/components/ProjectCard";
import { useOrders } from "@/lib/hooks/orders";
import { getCookie } from "@/lib/cookies";
import type { IOrder } from "@/types/order";
import { useOrderActions } from "@/lib/hooks/order-actions";
import { ORDER_STATUS } from "@/constants/order-status";

export default function Orders() {
  const [selectedProject, setSelectedProject] = useState<IOrder | null>(null);
  const [filters, setFilters] = useState({ search: "", status: "" });
  const { data: actions } = useOrderActions(getCookie("access_token"));
  const { data: allData, refetch } = useOrders(
    { search: "", status: "" },
    getCookie("access_token")
  );
  const [open, setOpen] = useState(false);

  const handleRowClick = (order: IOrder) => {
    setSelectedProject(order);
    setOpen(true);
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredData = useMemo(() => {
    if (!allData) return [];

    return allData.filter((order) => {
      const matchesSearch = order.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesStatus = !filters.status || order.status === filters.status;
      return matchesSearch && matchesStatus;
    });
  }, [allData, filters.search, filters.status]);

  const activeProjectsCount = useMemo(() => {
    return (
      allData?.filter((order) => order.status === "IN_PROGRESS").length ?? 0
    );
  }, [allData]);

  return (
    <>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold">Мои заявки</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-green-600 text-white">
            <CardContent className="py-6">
              <div className="text-3xl font-bold">{allData?.length ?? 0}</div>
              <div>Всего заявок</div>
            </CardContent>
          </Card>

          <Card className="bg-green-600 text-white">
            <CardContent className="py-6">
              <div className="text-3xl font-bold">{activeProjectsCount}</div>
              <div>Активных проектов</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-4 space-y-2">
              <h2 className="font-semibold">Последние заявки</h2>
              {actions?.map((action, idx) => (
                <div key={idx} className="text-sm flex justify-between gap-4">
                  <span className="truncate whitespace-nowrap overflow-hidden max-w-[70%]">
                    {action.title}
                  </span>
                  <span className="text-gray-500 whitespace-nowrap">
                    {action.status === "PENDING"
                      ? "Новая"
                      : action.status === "IN_PROGRESS"
                      ? "В работе"
                      : action.status === "COMPLETED"
                      ? "Завершена"
                      : "Отклонена"}
                  </span>
                  <span className="text-gray-500 whitespace-nowrap">
                    {new Date(action.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">Заявки</div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {filters.status
                    ? ORDER_STATUS[filters.status as keyof typeof ORDER_STATUS]
                    : "Статус"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => setFilters({ ...filters, status: "" })}
                >
                  Все
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilters({ ...filters, status: "PENDING" })}
                >
                  Новая
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setFilters({ ...filters, status: "IN_PROGRESS" })
                  }
                >
                  В работе
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setFilters({ ...filters, status: "COMPLETED" })
                  }
                >
                  Завершен
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilters({ ...filters, status: "REJECTED" })}
                >
                  Отклонена
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Input
              placeholder="Поиск..."
              className="w-48"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>
        </div>

        <div className="overflow-auto rounded-lg border">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="px-4 py-2">Название</th>
                <th className="px-4 py-2">Дата начала</th>
                <th className="px-4 py-2">Дата окончания</th>
                <th className="px-4 py-2">Статус</th>
                <th className="px-4 py-2">Команда</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((order, idx) => (
                <tr
                  key={idx}
                  className="border-t cursor-pointer hover:bg-gray-50"
                  onClick={() => handleRowClick(order)}
                >
                  <td className="px-4 py-2">{order.title}</td>
                  <td className="px-4 py-2">
                    {order.estimated_start_date
                      ? new Date(
                          order.estimated_start_date
                        ).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-2">
                    {order.estimated_end_date
                      ? new Date(order.estimated_end_date).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-2">
                    <Badge
                      variant={
                        order.status === "PENDING"
                          ? "outline"
                          : order.status === "IN_PROGRESS"
                          ? "secondary"
                          : order.status === "COMPLETED"
                          ? "default"
                          : order.status === "REJECTED"
                          ? "destructive"
                          : "default"
                      }
                    >
                      {ORDER_STATUS[order.status]}
                    </Badge>
                  </td>
                  <td className="px-4 py-2">{order.team?.name || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Модалка с карточкой проекта */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader />
          {selectedProject && <ProjectCard order={selectedProject} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
