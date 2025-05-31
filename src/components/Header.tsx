import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <div className="max-w-[1440px] w-full px-2 py-4 flex items-center justify-between">
      <div className="text-lg">
        <Link
          to="/"
          className="mr-2 pr-2 border-r-2 text-primary uppercase font-bold"
        >
          Viva la belousov
        </Link>
        <span className="text-zinc-400">Сервис разработки ПО</span>
      </div>
      <div className="flex items-center gap-8">
        <ul className="text-zinc-500 flex gap-7">
          <li>
            <Link to="/" className="hover:text-black">
              Главная
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-black">
              Подать заявку
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-black">
              Кабинет мененджера
            </Link>
          </li>
        </ul>
        <div className="flex gap-3">
          <Button asChild variant={"outline"}>
            <Link to="/sign-in">Войти</Link>
          </Button>
          <Button asChild>
            <Link to="/sign-up">Регистрация</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
