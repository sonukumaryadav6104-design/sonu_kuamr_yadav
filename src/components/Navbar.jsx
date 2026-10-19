import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { navLinks, profile } from "../data.js";

export default function Navbar({ onHire }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  // Blur the bar once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is on screen, to highlight it in the menu.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Lock page scroll while the menu is open, and close it with Escape.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-[30] flex items-center justify-between px-6 py-4 transition-all duration-300 ${
          scrolled && !open ? "bg-bg/70 backdrop-blur-md border-b border-line" : "border-b border-transparent"
        }`}
      >
        <a href="#home" onClick={() => setOpen(false)} className="text-xl font-bold">
          {profile.logo}
          <span className="grad-text"></span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onHire}
            className="inline-block rounded-full px-4 sm:px-5 py-2 text-sm font-medium bg-gradient-to-r from-acc to-acc2 hover:-translate-y-0.5 transition-transform"
          >
            Hire me
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="bg-card border border-line rounded-full px-4 sm:px-5 py-2 text-sm hover:border-acc transition-colors"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {/* scroll progress */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-acc to-acc2"
          style={{ scaleX: progress }}
        />
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[20] bg-bg flex flex-col items-center justify-center gap-3"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
          >
            {navLinks.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  setOpen(false);
                  if (l.href === "#hire") {
                    e.preventDefault();
                    setTimeout(onHire, 350);
                  }
                }}
                className={`text-4xl md:text-6xl font-bold transition-colors hover:text-acc ${
                  active === l.href ? "grad-text" : ""
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.07 }}
              >
                {l.label}
              </motion.a>
            ))}

            <motion.div
              className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2 text-sm text-mut px-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">
                {profile.email}
              </a>
              <div className="flex gap-4">
                {profile.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-acc hover:underline">
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}