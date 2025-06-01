import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ServerError() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-6xl font-bold text-primary mb-4">500</h1>
      <h2 className="text-2xl font-semibold mb-2">Внутренняя ошибка сервера</h2>
      <p className="text-gray-600 mb-6">
        Что-то пошло не так на нашей стороне. Мы уже разбираемся!
      </p>
      <Button onClick={() => navigate("/")}>Вернуться на главную</Button>
    </div>
  );
}
