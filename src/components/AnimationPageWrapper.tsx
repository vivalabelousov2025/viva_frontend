import { motion } from "framer-motion";
import type React from "react";

const variants = {
  initial: {
    y: "50%", // заходит справа
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.05,
      ease: "easeOut",
    },
  },
  exit: {
    y: "-50%", // уходит влево
    opacity: 0,
    transition: {
      duration: 0.05,
      ease: "easeIn",
    },
  },
};

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
