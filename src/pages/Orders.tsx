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
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import type { Project } from "@/components/ProjectCard";
import { ProjectCard } from "@/components/ProjectCard";

const applications = [
  {
    name: "Корпоративный портал",
    date: "12.04.2024",
    status: "Новая",
    team: "",
  },
  {
    name: "Электронная коммерция",
    date: "10.04.2024",
    status: "В работе",
    team: "Gamma",
  },
  {
    name: "Резервное копирование",
    date: "08.04.2024",
    status: "Новая",
    team: "",
  },
  { name: "Мобильный сайт", date: "07.04.2024", status: "Новая", team: "" },
];

const actions = [
  { text: "Назначена команда на проект", time: "1 час назад" },
  { text: "Подана заявка «Мобильный сайт»", time: "3 часа назад" },
  {
    text: "Обновлён трафик проекта «Электронная челентано »",
    time: "5 часов назад",
  },
  { text: "Создан проект «Электронная коммерция»", time: "Вчера" },
];

export const Orders = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  const handleRowClick = (app: (typeof applications)[number]) => {
    const mockProject: Project = {
      title: app.name,
      status: app.status,
      customer: app.team || "—",
      description: "—",
      startDate: app.date,
      endDate: app.date,
      teamSize: 4,
      budget: "100.000$",
    };
    setSelectedProject(mockProject);
    setOpen(true);
  };

  return (
    <>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold">Мои заявки</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-green-600 text-white">
            <CardContent className="py-6">
              <div className="text-3xl font-bold">7</div>
              <div>Всего заявок</div>
            </CardContent>
          </Card>

          <Card className="bg-green-600 text-white">
            <CardContent className="py-6">
              <div className="text-3xl font-bold">4</div>
              <div>Активных проектов</div>
            </CardContent>
          </Card>

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
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">Заявки</div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Статус</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Все</DropdownMenuItem>
                <DropdownMenuItem>Новая</DropdownMenuItem>
                <DropdownMenuItem>В работе</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Input placeholder="Поиск..." className="w-48" />
          </div>
        </div>

        <div className="overflow-auto rounded-lg border">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="px-4 py-2">Название</th>
                <th className="px-4 py-2">Дата</th>
                <th className="px-4 py-2">Статус</th>
                <th className="px-4 py-2">Команда</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <tr
                  key={idx}
                  className="border-t cursor-pointer hover:bg-gray-50"
                  onClick={() => handleRowClick(app)}
                >
                  <td className="px-4 py-2">{app.name}</td>
                  <td className="px-4 py-2">{app.date}</td>
                  <td className="px-4 py-2">
                    <Badge
                      variant={app.status === "Новая" ? "default" : "secondary"}
                    >
                      {app.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-2">{app.team || "—"}</td>
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
          {selectedProject && <ProjectCard project={selectedProject} />}
        </DialogContent>
      </Dialog>
    </>
  );
};
