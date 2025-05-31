import { Link } from "react-router-dom";

export const Footer = () => {
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
      <span className="text-lg text-zinc-500">© Все права защищены</span>
    </div>
  );
};
