import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="max-w-[1440px] sm:flex-row flex-col w-full px-2 py-4 flex items-center justify-between">
      <div className="text-lg flex">
        <Link
          to="/"
          className="sm:mr-2 sm:pr-2 sm:border-r-2 text-primary uppercase font-bold"
        >
          Viva la belousov
        </Link>
        <span className="text-zinc-400 hidden sm:block">
          Сервис разработки ПО
        </span>
      </div>
      <span className="text-lg text-zinc-500">© Все права защищены</span>
    </div>
  );
};
