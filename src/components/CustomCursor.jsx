import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [big, setBig] = useState(false);

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => setBig(!!e.target.closest("a, button, .card, input, textarea"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[200] pointer-events-none rounded-full border-2 border-acc hidden [@media(hover:hover)_and_(pointer:fine)]:block"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: big ? 60 : 34,
        height: big ? 60 : 34,
        backgroundColor: big ? "rgba(139,109,255,0.2)" : "rgba(139,109,255,0)",
      }}
      transition={{ duration: 0.2 }}
    />
  );
}
