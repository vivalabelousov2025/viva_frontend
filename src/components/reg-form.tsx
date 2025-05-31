import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { IRegisterRequest } from "@/types/auth";
import { register } from "@/api/auth";

export function RegForm({ className, ...props }: React.ComponentProps<"div">) {
  const [data, setData] = useState<IRegisterRequest & { repPassword: string }>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    repPassword: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await register(data);
    if (response.data.status === "OK") {
      navigate("/sign-in");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">Регистрация</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Имя</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Введите ваше имя"
                  required
                  value={data.first_name}
                  onChange={(e) =>
                    setData({ ...data, first_name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Фамилия</Label>
                <Input
                  id="lastname"
                  type="text"
                  placeholder="Введите вашу фамилию"
                  required
                  value={data.last_name}
                  onChange={(e) =>
                    setData({ ...data, last_name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Пароль</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                  required
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="repPassword">Повторите пароль</Label>
                </div>
                <Input
                  id="repPassword"
                  type="password"
                  placeholder="Введите пароль"
                  required
                  value={data.repPassword}
                  onChange={(e) =>
                    setData({ ...data, repPassword: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Зарегистрироваться
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Уже есть аккаунт?{" "}
              <Link
                to="/sign-in"
                className="text-primary underline underline-offset-4"
              >
                Войти
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
