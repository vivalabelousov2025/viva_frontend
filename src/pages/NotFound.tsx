"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className={cn("text-6xl font-bold text-primary mb-4")}>404</h1>
      <h2 className="text-2xl font-semibold mb-2">Страница не найдена</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        К сожалению, страница, которую вы ищете, не существует или была
        перемещена.
      </p>
      <Link to="/">
        <Button variant="default">Вернуться на главную</Button>
      </Link>
    </div>
  );
}
