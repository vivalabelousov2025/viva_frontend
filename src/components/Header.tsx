import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Иконки из lucide
import { useAuth } from "@/context/auth-context";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="max-w-[1440px] bg-white w-full px-2 py-4 flex items-center justify-between">
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

      {/* Desktop Menu (≥1280px) */}
      <div className="hidden xl:flex items-center gap-8">
        <ul className="text-zinc-500 flex gap-7">
          <li>
            <Link to="/" className="hover:text-black">
              Главная
            </Link>
          </li>
          {!user?.is_admin && (
            <>
              <li>
                <Link to="/create-order" className="hover:text-black">
                  Подать заявку
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-black">
                  Мои заявки
                </Link>
              </li>
            </>
          )}
          {user?.is_admin && (
            <li>
              <Link to="/manager" className="hover:text-black">
                Кабинет мененджера
              </Link>
            </li>
          )}
        </ul>
        <div className="flex gap-3">
          {isAuthenticated ? (
            <>
              <div className="py-[6px]">{user?.email} </div>
              <Button onClick={() => logout()}>Выйти</Button>
            </>
          ) : (
            <>
              <Button asChild variant={"outline"}>
                <Link to="/sign-in">Войти</Link>
              </Button>
              <Button asChild>
                <Link to="/sign-up">Регистрация</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Burger button (<=1280px) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="xl:hidden text-zinc-700"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-[70px] right-2 z-50 w-[90%] max-w-sm bg-white shadow-lg rounded-xl p-6 xl:hidden">
          <ul className="text-zinc-700 flex flex-col gap-4 mb-4">
            <li>
              <Link to="/" className="hover:text-black">
                Главная
              </Link>
            </li>
            {!user?.is_admin && (
              <>
                <li>
                  <Link to="/" className="hover:text-black">
                    Подать заявку
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="hover:text-black">
                    Мои заявки
                  </Link>
                </li>
              </>
            )}
            {user?.is_admin && (
              <li>
                <Link to="/manager" className="hover:text-black">
                  Кабинет мененджера
                </Link>
              </li>
            )}
          </ul>
          <div className="flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <div className="py-[6px]">{user?.email} </div>
                <Button onClick={() => logout()}>Выйти</Button>
              </>
            ) : (
              <>
                <Button asChild variant={"outline"}>
                  <Link to="/sign-in">Войти</Link>
                </Button>
                <Button asChild>
                  <Link to="/sign-up">Регистрация</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
