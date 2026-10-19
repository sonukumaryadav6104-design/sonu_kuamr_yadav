import { motion } from "framer-motion";
import Reveal from "./Reveal.jsx";
import { hire, profile } from "../data.js";

export default function HireMe({ onHire }) {
  return (
    <section id="hire" className="section">
      <Reveal>
        <div className="relative rounded-3xl p-px bg-gradient-to-br from-acc via-line to-acc2">
          <div className="relative overflow-hidden rounded-3xl bg-card p-8 md:p-12">
            <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-acc/20 blur-[100px] pointer-events-none" />
            <p className="inline-flex items-center gap-2 text-sm text-mut mb-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available now
            </p>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Hiring a <span className="grad-text">full-stack or AI</span> intern?
            </h2>
            <p className="text-mut text-lg mt-5 max-w-2xl">{hire.pitch}</p>

            <div className="grid gap-4 md:grid-cols-3 mt-10">
              {hire.reasons.map((r, i) => (
                <motion.div
                  key={r.title}
                  className="rounded-2xl border border-line bg-bg/60 p-5"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <h3 className="font-bold mb-1">{r.title}</h3>
                  <p className="text-mut text-sm">{r.desc}</p>
                </motion.div>
              ))}
            </div>

            <dl className="grid gap-x-10 gap-y-3 sm:grid-cols-2 mt-10 text-sm">
              {hire.availability.map((a) => (
                <div key={a.label} className="flex gap-3 border-b border-line pb-3">
                  <dt className="text-mut w-24 shrink-0">{a.label}</dt>
                  <dd>{a.value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap gap-3 mt-10">
              <button
                onClick={onHire}
                className="rounded-full px-8 py-3.5 font-medium bg-gradient-to-r from-acc to-acc2 shadow-[0_10px_40px_-10px_rgba(139,109,255,0.7)] hover:-translate-y-1 transition-transform"
              >
                Connect with me
              </button>
              <a
                href={profile.socials[1]?.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-8 py-3.5 font-medium border border-line hover:border-acc hover:-translate-y-1 transition-all"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}