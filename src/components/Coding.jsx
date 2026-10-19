import { useEffect, useState } from "react";
import Reveal from "./Reveal.jsx";

/* ---------------------------------------------------------------------------
   CONFIG: username OR full profile link, both work.
--------------------------------------------------------------------------- */
const LC_INPUT = "Sonu_kumar61";

const LC_USER = (() => {
  const s = LC_INPUT.trim().replace(/\/+$/, "");
  const m = s.match(/leetcode\.com\/(?:u\/)?([^/?#]+)/i);
  return encodeURIComponent(m ? m[1] : s);
})();

const LC_API = `https://leetcode-stats.tashif.codes/${LC_USER}`;
const CACHE_KEY = "leetcode-counts-v2";
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours

const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&family=Sora:wght@500;600;700&display=swap');`;
const HEAD = { fontFamily: "'Sora', system-ui, sans-serif" };
const BODY = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acc";

/* ------------------------------- data fetch ------------------------------- */
const num = (...vals) => {
  for (const v of vals) if (typeof v === "number" && !Number.isNaN(v)) return v;
  return undefined;
};

function normalize(j) {
  const d = j?.data && typeof j.data === "object" ? { ...j.data, ...j } : j;
  const solved = num(d?.totalSolved, d?.solvedProblem);
  if (solved === undefined) throw new Error("Unexpected response shape");

  return {
    solved,
    easy: num(d?.easySolved),
    medium: num(d?.mediumSolved),
    hard: num(d?.hardSolved),
    totalEasy: num(d?.totalEasy),
    totalMedium: num(d?.totalMedium),
    totalHard: num(d?.totalHard),
    totalQuestions: num(d?.totalQuestions),
  };
}

function useLeetCode() {
  const [state, setState] = useState({ loading: true, data: null, error: false });

  useEffect(() => {
    const ctl = new AbortController();

    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
      if (cached && Date.now() - cached.t < CACHE_TTL) {
        setState({ loading: false, data: cached.data, error: false });
        return;
      }
    } catch {
      /* ignore bad cache */
    }

    fetch(LC_API, { signal: ctl.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((j) => {
        if (j.status && j.status !== "success") throw new Error(j.message || "Failed");
        const data = normalize(j);
        setState({ loading: false, data, error: false });
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data }));
        } catch {
          /* storage unavailable */
        }
      })
      .catch(() => {
        if (!ctl.signal.aborted) setState({ loading: false, data: null, error: true });
      });

    return () => ctl.abort();
  }, []);

  return state;
}

/* Smooth count-up (skipped for reduced motion) */
function useCountUp(target, duration = 1100) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (typeof target !== "number") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(target);
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

/* soft light following the cursor (no re-renders) */
const track = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
};

/* --------------------------------- pieces --------------------------------- */
function ExternalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/* Full class strings so Tailwind can see them. */
const TIERS = [
  {
    key: "easy",
    label: "Easy",
    hex: "#34d399",
    box: "border-emerald-400/25 from-emerald-400/[0.14] to-emerald-400/[0.02]",
    line: "via-emerald-300/70",
    text: "text-emerald-300",
    dot: "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]",
    bar: "from-emerald-500 to-emerald-300",
  },
  {
    key: "medium",
    label: "Medium",
    hex: "#fbbf24",
    box: "border-amber-400/25 from-amber-400/[0.14] to-amber-400/[0.02]",
    line: "via-amber-300/70",
    text: "text-amber-300",
    dot: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]",
    bar: "from-amber-500 to-amber-300",
  },
  {
    key: "hard",
    label: "Hard",
    hex: "#fb7185",
    box: "border-rose-400/25 from-rose-400/[0.14] to-rose-400/[0.02]",
    line: "via-rose-300/70",
    text: "text-rose-300",
    dot: "bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.8)]",
    bar: "from-rose-500 to-rose-300",
  },
];

/* Segmented ring showing the share of Easy / Medium / Hard */
function Ring({ data, loading }) {
  const R = 84;
  const C = 2 * Math.PI * R;
  const GAP = 7;

  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!data) return;
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [data]);

  const counts = TIERS.map((t) => data?.[t.key] || 0);
  const sum = counts.reduce((a, b) => a + b, 0) || 1;

  let cum = 0;
  const arcs = TIERS.map((t, i) => {
    const frac = counts[i] / sum;
    const full = frac * C;
    const len = Math.max(0, full - (counts.filter(Boolean).length > 1 ? GAP : 0));
    const arc = { t, len, offset: cum + GAP / 2 };
    cum += full;
    return arc;
  });

  const shown = useCountUp(data?.solved);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[260px]">
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full -rotate-90"
        role="img"
        aria-label={
          data
            ? `${data.solved} problems solved: ${data.easy} easy, ${data.medium} medium, ${data.hard} hard`
            : "Problems solved"
        }
      >
        <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="12" />
        {arcs.map(({ t, len, offset }) =>
          len > 0 ? (
            <circle
              key={t.key}
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke={t.hex}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${ready ? len : 0} ${C}`}
              strokeDashoffset={-offset}
              style={{
                transition: "stroke-dasharray 1.3s cubic-bezier(0.22, 1, 0.36, 1)",
                filter: `drop-shadow(0 0 6px ${t.hex}66)`,
              }}
            />
          ) : null
        )}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span
          style={HEAD}
          className={`text-5xl font-semibold tabular-nums tracking-tight ${loading ? "animate-pulse text-mut" : ""}`}
        >
          {loading ? "–" : shown}
        </span>
        <span style={BODY} className="mt-1 text-xs uppercase tracking-[0.18em] text-mut">
          Solved
        </span>
      </div>
    </div>
  );
}

function TierBox({ tier, solved, total, loading }) {
  const shown = useCountUp(solved);
  const pct = total && solved != null ? Math.min(100, (solved / total) * 100) : 0;
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (solved == null) return;
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [solved]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-gradient-to-b p-5 transition-transform duration-300 hover:-translate-y-1 ${tier.box}`}
    >
      <span
        className={`pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent ${tier.line} to-transparent`}
      />

      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${tier.dot}`} />
        <span style={BODY} className={`text-sm font-medium ${tier.text}`}>
          {tier.label}
        </span>
      </div>

      <div
        style={HEAD}
        className={`mt-5 text-4xl font-semibold tabular-nums tracking-tight ${loading ? "animate-pulse text-mut" : ""}`}
      >
        {loading ? "–" : solved == null ? "–" : shown}
      </div>
      {total ? (
        <div style={BODY} className="mt-1 text-xs text-mut">
          of {total.toLocaleString()} problems
        </div>
      ) : null}

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${tier.bar}`}
          style={{
            width: ready ? `${pct}%` : "0%",
            transition: "width 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
    </div>
  );
}

/* --------------------------------- section -------------------------------- */
export default function Coding() {
  const { loading, data, error } = useLeetCode();

  return (
    <section id="coding" className="section">
      <style>{FONT_CSS}</style>

      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <header className="mb-12 max-w-2xl">
            <span className="block h-px w-12 bg-gradient-to-r from-acc to-acc2" />
            <h2
              style={HEAD}
              className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight leading-tight"
            >
              Problem solving
            </h2>
            <p style={BODY} className="mt-3 text-base md:text-lg text-mut leading-relaxed">
              Problems solved on LeetCode, grouped by difficulty.
            </p>
          </header>
        </Reveal>

        <Reveal>
          <article
            onMouseMove={track}
            className="group relative rounded-3xl bg-gradient-to-br from-acc to-acc2 p-px"
          >
            <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-card p-6 sm:p-8 md:p-10">
              {/* ambient glows */}
              <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-acc/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-acc2/10 blur-3xl" />
              {/* cursor spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(139,109,255,0.10), transparent 70%)",
                }}
              />

              <div className="relative grid items-center gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
                <Ring data={data} loading={loading} />

                <div>
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <div style={BODY} className="text-xs uppercase tracking-[0.18em] text-mut">
                        LeetCode
                      </div>
                      <div style={HEAD} className="mt-1 text-xl font-semibold tracking-tight">
                        Difficulty breakdown
                      </div>
                    </div>
                    <a
                      href={`https://leetcode.com/u/${LC_USER}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LeetCode profile"
                      style={BODY}
                      className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-acc to-acc2 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition-transform hover:-translate-y-0.5 ${focus}`}
                    >
                      View profile
                      <ExternalIcon />
                    </a>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {TIERS.map((t) => (
                      <TierBox
                        key={t.key}
                        tier={t}
                        solved={data?.[t.key]}
                        total={data?.[`total${t.label}`]}
                        loading={loading}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {error && !loading && (
          <p style={BODY} className="mt-4 text-sm text-mut" role="status">
            Couldn't load LeetCode stats right now. Please try again later.
          </p>
        )}
      </div>
    </section>
  );
}