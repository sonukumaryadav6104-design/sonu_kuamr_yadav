import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { profile } from "../data.js";

// Starts after the intro splash (2.2s) has slid away.
const D = 2.3;
const ease = [0.22, 1, 0.36, 1];
const ROLES = profile.roles;

/* One short line instead of the long tagline in data.js. Edit freely. */
const SUMMARY = "Computer science student building full-stack web applications and applied AI systems.";

const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&family=Sora:wght@500;600;700&display=swap');`;
const HEAD = { fontFamily: "'Sora', system-ui, sans-serif" };
const BODY = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

/* Headline line that rises out of a mask */
function Line({ i, className = "", children }) {
  return (
    <span className="block overflow-hidden pb-[0.14em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: D + i * 0.12, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* Button that gently follows the cursor */
function Magnetic({ children }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.2);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.2);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} style={{ x, y }} onMouseMove={move} onMouseLeave={leave} className="inline-block">
      {children}
    </motion.div>
  );
}

/* Portrait that tilts toward the cursor, framed with a hairline gradient */
function Photo({ fade, reduced }) {
  const [failed, setFailed] = useState(false);
  const initials = profile.name.split(" ").map((w) => w[0]).slice(0, 2).join("");

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18 });
  const sy = useSpring(py, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);

  const move = (e) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      {...fade(0.3)}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ perspective: 1000 }}
      className="relative mx-auto w-56 sm:w-64 lg:w-full max-w-xs"
    >
      <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-acc/20 to-acc2/20 blur-3xl pointer-events-none" />

      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
        <div className="rounded-[1.75rem] p-px bg-gradient-to-br from-acc/70 via-line to-acc2/70">
          <div className="relative rounded-[calc(1.75rem-1px)] overflow-hidden bg-card aspect-[4/5]">
            {failed ? (
              <div className="w-full h-full flex items-center justify-center text-6xl font-semibold grad-text">
                {initials}
              </div>
            ) : (
              <img
                src={profile.photo}
                alt={profile.name}
                onError={() => setFailed(true)}
                className="w-full h-full object-cover"
              />
            )}
            {/* soft vignette keeps the photo feeling part of the page */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const spotlight = useMotionTemplate`radial-gradient(480px circle at ${mx}px ${my}px, rgba(139,109,255,0.13), transparent 65%)`;
  const [role, setRole] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const fade = (delay) => ({
    initial: { opacity: 0, y: reduced ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: D + delay, ease },
  });

  return (
    <section
      id="home"
      onMouseMove={onMove}
      style={BODY}
      className="relative z-10 min-h-screen overflow-hidden"
    >
      <style>{FONT_CSS}</style>

      {/* ambient layer: fine grid, cursor light, one slow glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 75%)",
        }}
      />
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: spotlight }} />
      <motion.div
        className="absolute -top-40 -right-32 w-[460px] h-[460px] rounded-full bg-acc/20 blur-[140px] pointer-events-none"
        animate={reduced ? undefined : { y: [0, 36, 0], x: [0, -24, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 min-h-screen grid lg:grid-cols-[1.3fr_0.7fr] gap-14 items-center pt-28 pb-24">
        <div className="flex flex-col">
          {/* availability */}
          <motion.div
            {...fade(0)}
            className="inline-flex items-center gap-2 self-start rounded-full border border-line bg-card/60 backdrop-blur px-3.5 py-1 text-xs text-mut"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {profile.status}
          </motion.div>

          {/* headline: compact, tight, confident */}
          <h1
            style={HEAD}
            className="mt-7 text-[clamp(2rem,3.9vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
          >
            <Line i={0}>Full-stack & AI</Line>
            <Line i={1} className="grad-text">developer who</Line>
            <Line i={2}>ships real products.</Line>
          </h1>

          {/* rotating role */}
          <motion.div {...fade(0.6)} className="mt-6 flex items-center gap-3 text-base md:text-lg text-white/90">
            <span className="h-px w-8 bg-gradient-to-r from-acc to-acc2" />
            <span className="relative h-7 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={role}
                  className="block"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                >
                  {ROLES[role]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p {...fade(0.7)} className="mt-4 text-mut text-base max-w-sm leading-relaxed">
            {SUMMARY}
          </motion.p>

          {/* actions */}
          <motion.div {...fade(0.85)} className="mt-9 flex flex-wrap items-center gap-5">
            <Magnetic>
              <a
                href="#projects"
                className="inline-block rounded-full px-7 py-3 text-sm font-medium bg-gradient-to-r from-acc to-acc2 shadow-[0_12px_40px_-12px_rgba(139,109,255,0.8)] ring-1 ring-white/10 transition-shadow hover:shadow-[0_16px_50px_-10px_rgba(139,109,255,0.95)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acc"
              >
                View my projects
              </a>
            </Magnetic>
            <div className="flex items-center gap-5 text-sm text-mut">
              <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">
                Email
              </a>
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <Photo fade={fade} reduced={reduced} />
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: D + 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex h-9 w-5 justify-center rounded-full border border-line pt-2"
      >
        <motion.span
          className="h-1.5 w-0.5 rounded-full bg-acc"
          animate={reduced ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.a>
    </section>
  );
}