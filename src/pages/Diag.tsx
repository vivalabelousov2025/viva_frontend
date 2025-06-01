import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const teams = ["Команда 1", "Команда 2", "Команда 3"];

const GanttChart = () => {
  const [selectedTeam, setSelectedTeam] = useState("Команда 1");

  const days = Array.from({ length: 22 }, (_, i) => i + 1);

  return (
    <div className="overflow-x-auto p-4">
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border p-2 text-left">Месяц, год</th>
            <th className="border p-2" colSpan={22}>
              Май, 2025
            </th>
          </tr>
          <tr>
            <th className="border p-2 text-left">Число</th>
            {days.map((day) => (
              <th key={day} className="border p-2 text-center">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border p-2">Команда 1</td>
              {days.map((day, colIndex) => {
                const isGreenBlock = rowIndex === 0 && day >= 1 && day <= 4;
                const prevGreen = colIndex > 0 && day - 1 >= 1 && day - 1 <= 4;
                const nextGreen = day + 1 >= 1 && day + 1 <= 4;

                const isStartOfBlock = isGreenBlock && !prevGreen;
                const isEndOfBlock = isGreenBlock && !nextGreen;

                const greenClass = isGreenBlock
                  ? `bg-green-500 ${isStartOfBlock ? "rounded-l-md" : ""} ${
                      isEndOfBlock ? "rounded-r-md" : ""
                    } ${prevGreen ? "border-l-0" : ""} ${
                      nextGreen ? "border-r-0" : ""
                    }`
                  : "";

                return (
                  <td
                    key={day}
                    className={`p-1 text-center border ${greenClass}`.trim()}
                  >
                    {isGreenBlock ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="w-full h-6 cursor-pointer"></button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Изменить команду</DialogTitle>
                          </DialogHeader>
                          <Select
                            value={selectedTeam}
                            onValueChange={setSelectedTeam}
                          >
                            <SelectTrigger className="w-full mt-4">
                              <SelectValue placeholder="Выберите команду" />
                            </SelectTrigger>
                            <SelectContent>
                              {teams.map((team) => (
                                <SelectItem key={team} value={team}>
                                  {team}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </DialogContent>
                      </Dialog>
                    ) : null}
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
