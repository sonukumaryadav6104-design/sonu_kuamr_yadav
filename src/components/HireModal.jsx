import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../data.js";

const social = (label) => profile.socials.find((s) => s.label === label)?.href;

function Badge({ children }) {
  return (
    <span className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-acc to-acc2 flex items-center justify-center text-white font-bold">
      {children}
    </span>
  );
}

const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export default function HireModal({ open, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) setCopied(false);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  };

  const linkClass =
    "flex items-center gap-4 flex-1 min-w-0 rounded-2xl border border-line bg-bg/60 p-4 hover:border-acc hover:-translate-y-0.5 transition-all";

  const options = [
    {
      key: "linkedin",
      title: "LinkedIn",
      sub: "Send me a message or connection request",
      href: social("LinkedIn"),
      icon: <Badge>in</Badge>,
    },
    {
      key: "github",
      title: "GitHub",
      sub: "See my code and projects",
      href: social("GitHub"),
      icon: <Badge>GH</Badge>,
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Connect with me"
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-line bg-card p-6 md:p-8"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={() => onClose()}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-line text-mut hover:border-acc hover:text-white transition-colors"
            >
              ✕
            </button>

            <p className="inline-flex items-center gap-2 text-sm text-mut mb-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.status}
            </p>
            <h3 className="text-3xl font-bold pr-10">
              Let’s <span className="grad-text">connect</span>
            </h3>
            <p className="text-mut text-sm mt-2 mb-6">Pick the way that works best for you.</p>

            <div className="grid gap-3">
              {/* Email: open mail app, or copy the address */}
              <motion.div className="flex gap-2" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
                <a
                  href={`mailto:${profile.email}?subject=${encodeURIComponent("Opportunity for " + profile.name)}`}
                  className={linkClass}
                >
                  <Badge><MailIcon /></Badge>
                  <span className="min-w-0">
                    <b className="block">Email</b>
                    <span className="block text-sm text-mut truncate">{profile.email}</span>
                  </span>
                </a>
                <button
                  onClick={copyEmail}
                  className="shrink-0 rounded-2xl border border-line px-4 text-sm text-mut hover:border-acc hover:text-white transition-colors"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </motion.div>

              {options.map(
                (o, i) =>
                  o.href && (
                    <motion.a
                      key={o.key}
                      href={o.href}
                      target="_blank"
                      rel="noreferrer"
                      className={linkClass}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.16 + i * 0.08 }}
                    >
                      {o.icon}
                      <span className="min-w-0 flex-1">
                        <b className="block">{o.title}</b>
                        <span className="block text-sm text-mut">{o.sub}</span>
                      </span>
                      <span className="text-mut">↗</span>
                    </motion.a>
                  )
              )}
            </div>

            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}