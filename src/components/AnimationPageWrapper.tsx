import { motion } from "framer-motion";

const variants = {
  initial: {
    y: "100%", // заходит справа
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.02,
      ease: "easeOut",
    },
  },
  exit: {
    y: "-100%", // уходит влево
    opacity: 0,
    transition: {
      duration: 0.02,
      ease: "easeIn",
    },
  },
};

export default function PageWrapper({ children }) {
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
