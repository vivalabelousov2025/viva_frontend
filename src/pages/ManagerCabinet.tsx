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

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMutationChangeOrderTeam, useTeams } from "@/lib/hooks/teams";

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

const ManagerCabinet = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [currentDate, setCurrentDate] = useState(new Date());
  const { data, refetch: orderRefetch } = useOrders(
    { search: "", status: "" },
    getCookie("access_token")
  );
  const { data: teams } = useTeams();

  const { mutate: changeOrderTeam } = useMutationChangeOrderTeam(
    getCookie("access_token")
  );

  const totalRefetch = () => {
    orderRefetch();
  };

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
              <Button
                variant="outline"
                className="mr-2"
                onClick={handlePrevMonth}
              >
                <ChevronLeft />
              </Button>
              {currentMonth}, {currentDate.getFullYear()}
              <Button
                variant="outline"
                className="ml-2"
                onClick={handleNextMonth}
              >
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
                        <button className="w-full h-full cursor-pointer ring-none outline-none transition-colors">
                          {orderForDay.title}
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{orderForDay.title}</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-2 mt-4">
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
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between"
                              >
                                {value
                                  ? teams?.find((team) => team.name === value)
                                      ?.name
                                  : "Выберите команду..."}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Найти команду..."
                                  className="h-9"
                                />
                                <CommandList>
                                  <CommandEmpty>
                                    No framework found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {teams?.map((team) => (
                                      <CommandItem
                                        key={team.team_id}
                                        value={team.name}
                                        onSelect={(currentValue) => {
                                          setValue(
                                            currentValue === value
                                              ? ""
                                              : currentValue
                                          );
                                          setOpen(false);
                                          changeOrderTeam(
                                            {
                                              orderId: orderForDay.order_id,
                                              teamId: team.team_id,
                                            },
                                            {
                                              onSuccess: () => {
                                                totalRefetch();
                                              },
                                            }
                                          );
                                        }}
                                      >
                                        {team.name}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            value === team.name
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
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

export default ManagerCabinet;
