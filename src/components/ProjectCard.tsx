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

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="max-w-2xl mx-auto mt-4 border-none shadow-none rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-green-600 font-semibold">
          {project.title}
        </CardTitle>
        <Badge variant="destructive" className="text-base px-3 py-1">
          {project.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <UserIcon className="w-4 h-4" />
          <span className="font-semibold">Заказчик:</span>
          <span>{project.customer}</span>
        </div>
        <div className="flex items-center gap-2">
          <ClipboardIcon className="w-4 h-4" />
          <span className="font-semibold">Описание:</span>
          <span>{project.description}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          <span className="font-semibold">Дата начала:</span>
          <span>{project.startDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <BarChartIcon className="w-4 h-4" />
          <span className="font-semibold">Завершение:</span>
          <span>{project.endDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <UserIcon className="w-4 h-4" />
          <span className="font-semibold">Статус:</span>
          <span>{project.status}</span>
        </div>
        <div className="flex items-center gap-2">
          <UsersIcon className="w-4 h-4" />
          <span className="font-semibold">Количество человек:</span>
          <span>{project.teamSize}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSignIcon className="w-4 h-4" />
          <span className="font-semibold">Оценка стоимости проекта:</span>
          <span>{project.budget}</span>
        </div>
      </CardContent>
    </Card>
  );
}
