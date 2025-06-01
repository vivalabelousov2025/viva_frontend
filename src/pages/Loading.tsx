import { Loader2 } from "lucide-react";

export default function Loading() {
  console.log("render");
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center space-y-4 p-8 rounded-lg bg-background shadow-lg">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
        <p className="text-lg font-medium text-foreground">Загрузка...</p>
      </div>
    </div>
  );
}
