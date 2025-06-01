import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useOrders } from "@/lib/hooks/orders";
import { getCookie } from "@/lib/cookies";
import type { IOrder } from "@/types/order";

const month = {
  0: "Январь",
  1: "Февраль",
  2: "Март",
  3: "Апрель",
  4: "Май",
  5: "Июнь",
  6: "Июль",
  7: "Август",
  8: "Сентябрь",
  9: "Октябрь",
  10: "Ноябрь",
  11: "Декабрь",
};

const GanttChart = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data } = useOrders(
    { search: "", status: "" },
    getCookie("access_token")
  );

  const groupedOrders = useMemo(() => {
    if (!data) return {};
    return data.reduce((acc, order) => {
      const teamName = order.team?.name || "Без команды";
      if (!acc[teamName]) {
        acc[teamName] = [];
      }
      acc[teamName].push(order);
      return acc;
    }, {} as Record<string, IOrder[]>);
  }, [data]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const days = Array.from(
    { length: getDaysInMonth(currentDate) },
    (_, i) => i + 1
  );
  const currentMonth = month[currentDate.getMonth() as keyof typeof month];

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const isOrderInCurrentMonth = (order: IOrder) => {
    const startDate = new Date(order.estimated_start_date);
    const endDate = new Date(order.estimated_end_date);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    const currentMonthStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const currentMonthEnd = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    currentMonthStart.setHours(0, 0, 0, 0);
    currentMonthEnd.setHours(0, 0, 0, 0);
    return startDate <= currentMonthEnd && endDate >= currentMonthStart;
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border p-2 text-left">Месяц, год</th>
            <th className="border p-2" colSpan={days.length}>
              <Button variant="outline" onClick={handlePrevMonth}>
                <ChevronLeft />
              </Button>
              {currentMonth}, {currentDate.getFullYear()}
              <Button variant="outline" onClick={handleNextMonth}>
                <ChevronRight />
              </Button>
            </th>
          </tr>
          <tr>
            <th className="border p-2 text-left">Команда</th>
            {days.map((day) => (
              <th key={day} className="border p-2 text-center">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedOrders).map(([teamName, orders]) => (
            <tr key={teamName}>
              <td className="border p-2">{teamName}</td>
              {days.map((day) => {
                const orderForDay = orders.find((order) => {
                  if (order.team?.name !== teamName) return false;
                  if (!isOrderInCurrentMonth(order)) return false;
                  const currentDay = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    day
                  );
                  const startDate = new Date(order.estimated_start_date);
                  const endDate = new Date(order.estimated_end_date);
                  startDate.setHours(0, 0, 0, 0);
                  endDate.setHours(0, 0, 0, 0);
                  currentDay.setHours(0, 0, 0, 0);
                  return (
                    currentDay.getTime() >= startDate.getTime() &&
                    currentDay.getTime() <= endDate.getTime()
                  );
                });

                if (!orderForDay) {
                  return <td key={day} className="p-1 text-center border"></td>;
                }

                // Проверяем, является ли этот день началом задачи
                const taskStartDay = Math.max(
                  1,
                  new Date(orderForDay.estimated_start_date).getMonth() ===
                    currentDate.getMonth()
                    ? new Date(orderForDay.estimated_start_date).getDate()
                    : 1
                );

                // Вычисляем длительность задачи в днях
                const taskEndDay = Math.min(
                  getDaysInMonth(currentDate),
                  new Date(orderForDay.estimated_end_date).getMonth() ===
                    currentDate.getMonth()
                    ? new Date(orderForDay.estimated_end_date).getDate()
                    : getDaysInMonth(currentDate)
                );
                const adjustedTaskDuration = taskEndDay - taskStartDay + 1;

                const isStartOfTask = day === taskStartDay;

                if (!isStartOfTask) {
                  return null;
                }

                return (
                  <td
                    key={day}
                    className="p-1 text-center border bg-green-500 text-white"
                    {...(adjustedTaskDuration > 1
                      ? { colSpan: adjustedTaskDuration }
                      : {})}
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="w-full h-full cursor-pointer hover:bg-green-600 transition-colors">
                          {orderForDay.title}
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{orderForDay.title}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <p>
                            <strong>Описание:</strong> {orderForDay.description}
                          </p>
                          <p>
                            <strong>Статус:</strong> {orderForDay.status}
                          </p>
                          <p>
                            <strong>Дата начала:</strong>{" "}
                            {new Date(
                              orderForDay.estimated_start_date
                            ).toLocaleDateString()}
                          </p>
                          <p>
                            <strong>Дата окончания:</strong>{" "}
                            {new Date(
                              orderForDay.estimated_end_date
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GanttChart;
