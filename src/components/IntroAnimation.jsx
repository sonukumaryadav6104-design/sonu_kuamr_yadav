import { useEffect } from "react";
import { motion } from "framer-motion";

export default function IntroAnimation({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-bg flex items-center justify-center"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.8, 0, 0.2, 1] }}
    >
      <motion.h1
        className="grad-text text-4xl md:text-6xl font-bold"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Welcome to My Digital Space 👋
      </motion.h1>
    </motion.div>
  );
}
