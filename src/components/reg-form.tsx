import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function RegForm({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">Вход</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Имя</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Введите ваше имя"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Фамилия</Label>
                <Input
                  id="lastname"
                  type="text"
                  placeholder="Введите вашу фамилию"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
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
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Войти
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Уже есть аккаунт?{" "}
              <Link
                to="/sign-in"
                className="text-primary underline underline-offset-4"
              >
                Зарегистрироваться
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
