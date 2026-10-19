import { useState } from "react";
import Reveal from "./Reveal.jsx";
import { profile } from "../data.js";

const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&family=Sora:wght@500;600;700&display=swap');`;
const HEAD = { fontFamily: "'Sora', system-ui, sans-serif" };
const BODY = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

const field =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3.5 text-base text-white placeholder:text-mut/70 outline-none transition-colors focus:border-acc focus:bg-white/[0.05]";

const linkedin = profile.socials?.find((s) => /linkedin/i.test(s.label));

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  linkedin && { label: "LinkedIn", value: "Connect with me", href: linkedin.href, external: true },
].filter(Boolean);

function Channel({ label, value, href, external }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-white/[0.02] px-5 py-4 transition-colors hover:border-acc/60 hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acc"
    >
      <span style={BODY} className="min-w-0">
        <span className="block text-sm text-mut">{label}</span>
        <span className="block truncate text-base font-medium text-white">{value}</span>
      </span>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 text-mut transition-all group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      >
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </a>
  );
}

export default function Contact() {
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  // Opens the visitor's email app with the message filled in.
  // Swap this for EmailJS, Formspree or your own API when you deploy.
  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${f.name}`);
    const body = encodeURIComponent(`${f.message}\n\nFrom: ${f.name} (${f.email})`);
    setSent(true);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section">
      <style>{FONT_CSS}</style>
      {/* same centered width as the Hero, Skills, Projects and Education */}
      <div className="mx-auto w-full max-w-6xl">
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* left: heading and direct channels */}
          <div>
            <span className="block h-px w-12 bg-gradient-to-r from-acc to-acc2" />
            <h2 style={HEAD} className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              Let’s work together
            </h2>
            <p style={BODY} className="mt-3 text-base md:text-lg text-mut leading-relaxed max-w-md">
              Send a message or reach me directly. I’ll get back to you as soon as I can.
            </p>

            <div className="mt-8 grid gap-3">
              {channels.map((c) => (
                <Channel key={c.label} {...c} />
              ))}
            </div>
          </div>

          {/* right: form */}
          <div className="rounded-3xl p-px bg-gradient-to-br from-acc/50 via-line to-acc2/40">
            <form
              onSubmit={submit}
              className="grid gap-5 rounded-[calc(1.5rem-1px)] bg-card px-7 py-8 md:px-9 md:py-10"
              style={BODY}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-mut">
                  Name
                  <input className={field} placeholder="Your name" required value={f.name} onChange={set("name")} />
                </label>
                <label className="grid gap-2 text-sm text-mut">
                  Email
                  <input
                    className={field}
                    type="email"
                    placeholder="you@company.com"
                    required
                    value={f.email}
                    onChange={set("email")}
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm text-mut">
                Message
                <textarea
                  className={`${field} min-h-36 resize-y`}
                  placeholder="How can I help?"
                  required
                  value={f.message}
                  onChange={set("message")}
                />
              </label>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="rounded-full px-7 py-3 text-sm font-medium bg-gradient-to-r from-acc to-acc2 shadow-[0_12px_40px_-12px_rgba(139,109,255,0.8)] ring-1 ring-white/10 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acc"
                >
                  Send message
                </button>
                {sent && (
                  <span role="status" className="text-sm text-mut">
                    Opening your email app. If nothing opens, email me directly.
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </Reveal>
      </div>
    </section>
  );
}