import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

// blobs
import Blob1 from "../assets/svg/blob1.svg";
import Blob2 from "../assets/svg/blob2.svg";

export const OrderForm = () => {
  const handleSubmit = () => {};

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-center">Подать заявку</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="orderName">Название проекта</Label>
              <Input
                id="orderName"
                type="text"
                placeholder="Введите название"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="orderDesc">Описание</Label>
              <Textarea
                id="orderDesc"
                placeholder="Введите описание"
                className="h-[150px]"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full">
                Отправить
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
