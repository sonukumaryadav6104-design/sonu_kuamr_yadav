import Reveal from "./Reveal.jsx";
import { projects } from "../data.js";

const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&family=Sora:wght@500;600;700&display=swap');`;
const HEAD = { fontFamily: "'Sora', system-ui, sans-serif" };
const BODY = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

/* AI/ML projects are matched by title. Every other project goes to full-stack.
   Two of each are shown: the first two matches in data.js order. */
const AI_TITLES = ["biomark", "nuclai"];
const isAI = (p) =>
  AI_TITLES.some((t) => p.title.toLowerCase().replace(/[^a-z]/g, "").includes(t));
const PICKS = {
  fullstack: projects.filter((p) => !isAI(p)).slice(0, 2),
  ai: projects.filter(isAI).slice(0, 2),
};

/* Profile URL, taken from the first project that has a github link.
   Edit the fallback if none of your projects have one. */
const GITHUB_PROFILE = (() => {
  const g = projects.find((p) => p.github)?.github || "";
  const m = g.match(/^(https?:\/\/github\.com\/[^/]+)/i);
  return `${m ? m[1] : "https://github.com/YOUR-USERNAME"}?tab=repositories`;
})();

const TRACKS = [
  { id: "fullstack", title: "Full-stack engineering", accent: "from-acc to-acc2" },
  { id: "ai", title: "Applied AI and machine learning", accent: "from-acc2 to-acc" },
];

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acc";

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

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

/* Soft light that follows the cursor inside the card (no re-renders) */
const track = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
};

function Card({ p, accent }) {
  // `live` falls back to the old `link` field.
  const live = p.live ?? p.link;

  return (
    <article
      onMouseMove={track}
      className={`group relative rounded-2xl p-px bg-gradient-to-br ${accent} transition-transform duration-300 hover:-translate-y-1`}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1rem-1px)] bg-card p-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(240px circle at var(--x, 50%) var(--y, 50%), rgba(139,109,255,0.14), transparent 70%)",
          }}
        />

        <div className="relative flex h-full flex-col">
          <h4 style={HEAD} className="text-lg font-semibold tracking-tight leading-snug">
            {p.title}
          </h4>
          <p style={BODY} className="mt-2 text-sm text-mut leading-relaxed line-clamp-3">
            {p.desc}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {(p.tags || []).slice(0, 4).map((t) => (
              <span
                key={t}
                style={BODY}
                className="rounded-md border border-line bg-white/[0.03] px-2.5 py-0.5 text-xs text-mut"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-2.5 pt-5">
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.title} source code on GitHub`}
                style={BODY}
                className={`inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm font-medium text-white transition-colors hover:border-acc/60 hover:bg-white/[0.07] ${focus}`}
              >
                <GitHubIcon />
                GitHub
              </a>
            )}
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.title} live demo`}
                style={BODY}
                className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-acc to-acc2 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition-transform hover:-translate-y-0.5 ${focus}`}
              >
                Live demo
                <ExternalIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <style>{FONT_CSS}</style>

      {/* same centered width as the Hero and Skills, so left and right edges line up */}
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <header className="mb-12 max-w-2xl">
            <span className="block h-px w-12 bg-gradient-to-r from-acc to-acc2" />
            <h2 style={HEAD} className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              Featured projects
            </h2>
            <p style={BODY} className="mt-3 text-base md:text-lg text-mut leading-relaxed">
              Two full-stack builds and two AI and machine learning builds, each with source code and a live demo.
            </p>
          </header>
        </Reveal>

        <div className="grid gap-12">
          {TRACKS.map((t) => {
            const items = PICKS[t.id];
            if (!items.length) return null;
            return (
              <Reveal key={t.id}>
                <div className="flex items-center gap-4">
                  <span className={`block h-px w-10 bg-gradient-to-r ${t.accent}`} />
                  <h3 style={HEAD} className="text-lg md:text-xl font-semibold tracking-tight">
                    {t.title}
                  </h3>
                </div>
                {/* cards fill the full width: equal space on the left and right */}
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {items.map((p) => (
                    <Card key={p.title} p={p} accent={t.accent} />
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* More projects: opens your GitHub repositories */}
        <Reveal>
          <div className="mt-14 flex justify-center">
            <a
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noreferrer"
              aria-label="See more projects on GitHub"
              style={BODY}
              className={`inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:border-acc/60 hover:bg-white/[0.07] ${focus}`}
            >
              <GitHubIcon />
              More projects on GitHub
              <ExternalIcon />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}