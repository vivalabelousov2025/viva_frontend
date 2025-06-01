import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UserIcon,
  CalendarIcon,
  ClipboardIcon,
  BarChartIcon,
  DollarSignIcon,
  UsersIcon,
} from "lucide-react";
import type { IOrder } from "@/types/order";
import { ORDER_STATUS } from "@/pages/Orders";

export type Project = {
  title: string;
  status: string;
  customer: string;
  description: string;
  startDate: string;
  endDate: string;
  teamSize: number;
  budget: string;
};

export function ProjectCard({ order }: { order: IOrder }) {
  return (
    <Card className="max-w-2xl mx-auto mt-4 border-none shadow-none rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-green-600 font-semibold">
          {order.title}
        </CardTitle>
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
          className="text-base px-3 py-1"
        >
          {ORDER_STATUS[order.status]}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <UserIcon className="w-4 h-4" />
          <span className="font-semibold">Заказчик:</span>
          <span>
            {order.user?.first_name} {order.user?.last_name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ClipboardIcon className="w-4 h-4" />
          <span className="font-semibold">Описание:</span>
          <span>{order.description}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          <span className="font-semibold">Дата начала:</span>
          <span>
            {order.estimated_start_date
              ? new Date(order.estimated_start_date).toLocaleDateString()
              : "—"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <BarChartIcon className="w-4 h-4" />
          <span className="font-semibold">Завершение:</span>
          <span>
            {order.estimated_end_date
              ? new Date(order.estimated_end_date).toLocaleDateString()
              : "—"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <UserIcon className="w-4 h-4" />
          <span className="font-semibold">Статус:</span>
          <span>{ORDER_STATUS[order.status]}</span>
        </div>
        <div className="flex items-center gap-2">
          <UsersIcon className="w-4 h-4" />
          <span className="font-semibold">Количество человек:</span>
          <span>{order.team?.members_count}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSignIcon className="w-4 h-4" />
          <span className="font-semibold">Оценка стоимости проекта:</span>
          <span>{order.total_price}</span>
        </div>
      </CardContent>
    </Card>
  );
}
