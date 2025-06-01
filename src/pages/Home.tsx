import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ShieldCheck, Wrench, Brain } from "lucide-react";
import BannerImg from "../assets/svg/HomeBanner.svg";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Brain className="w-16 h-16 text-green-500" />,
    title: "Умный подбор команды",
    description:
      "Искусственный интеллект анализирует проект подберёт подходящую команду исполнителей",
  },
  {
    icon: <CheckCircle className="w-16 h-16 text-green-500" />,
    title: "Простота подачи заявки",
    description:
      "Интуитивно понятная форма: просто опишите, что вам нужно – остальное сделаем мы",
  },
  {
    icon: <ShieldCheck className="w-16 h-16 text-green-500" />,
    title: "Безопасность и конфиденциальность",
    description:
      "Ваши данные надёжно защищены – безопасность и приватность в приоритете",
  },
  {
    icon: <Wrench className="w-16 h-16 text-green-500" />,
    title: "Гибкая настройка процессов",
    description: "Проект можно адаптировать под конкретные бизнес-задачи",
  },
];

export const Home = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-700 text-transparent bg-clip-text">
              Централизованный приём заявок на разработку программного
              обеспечения
            </h1>
            <p className="text-gray-600 mb-6">
              Помогаем компаниям находить исполнителей для IT-проектов любого
              уровня сложности. Доверьтесь нам, и мы подберем лучших
              специалистов!
            </p>
            <Button className="bg-green-500 hover:bg-green-600">
              Попробовать
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <img src={BannerImg} alt="Illustration" className="w-full max-w-md" />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
      >
        {features.map((feature, index) => (
          <Card
            key={index}
            className="text-center animate-gradient-wave rounded-xl shadow-md"
          >
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};
