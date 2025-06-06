import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { ILoginRequest } from "@/types/auth";
import { login } from "@/api/auth";
import { setCookie } from "@/lib/cookies";
import { getMe } from "@/api/user";
import { useAuth } from "@/context/auth-context";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [data, setData] = useState<ILoginRequest>({
    email: "",
    password: "",
  });
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login(data);
    const { access_token, refresh_token } = response.data;
    setCookie("access_token", access_token, 1);
    setCookie("refresh_token", refresh_token, 7);
    const userResponse = await getMe(access_token);
    setUser(userResponse.data);
    navigate("/");
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">Вход</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
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
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Войти
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Ещё нет аккаунта?{" "}
              <Link
                to="/sign-up"
                className="text-primary underline underline-offset-4"
              >
                Регистрация
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
