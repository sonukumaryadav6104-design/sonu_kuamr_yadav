import Reveal from "./Reveal.jsx";

const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&family=Sora:wght@500;600;700&display=swap');`;
const HEAD = { fontFamily: "'Sora', system-ui, sans-serif" };
const BODY = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

/* Edit the copy here. */
const DEGREE = {
  kind: "Bachelor’s degree",
  title: "B.Tech in Computer Science and Engineering",
  place: "IES College of Technology, Bhopal",
  meta: "RGPV affiliated",
  batch: "2024 – 2028",
  score: "7.99",
  scoreLabel: "Current CGPA",
};

const OTHERS = [
  { kind: "Senior secondary", title: "Class 12", score: "76.6%", accent: "from-acc2 to-acc" },
  { kind: "Secondary", title: "Class 10", score: "86.6%", accent: "from-acc to-acc2" },
  { kind: "Certification", title: "Machine Learning", sub: "NPTEL, IIT Madras", accent: "from-acc2 to-acc" },
];

function Degree() {
  return (
    <article className="group relative rounded-3xl p-px bg-gradient-to-br from-acc to-acc2 transition-shadow duration-500 hover:shadow-[0_30px_80px_-40px_rgba(139,109,255,0.55)]">
      {/* padding on both sides of the divider is equal (md:pr-12 / md:pl-12) */}
      <div className="rounded-[calc(1.5rem-1px)] bg-card px-8 py-9 md:px-12 md:py-11 grid gap-8 md:gap-0 md:grid-cols-[1.4fr_0.8fr] items-center">
        <div className="md:pr-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="block h-1 w-12 rounded-full bg-gradient-to-r from-acc to-acc2" />
            <span style={BODY} className="rounded-full border border-line px-3 py-1 text-sm text-mut">
              Batch {DEGREE.batch}
            </span>
          </div>
          <p style={BODY} className="mt-6 text-sm text-mut">{DEGREE.kind}</p>
          <h3 style={HEAD} className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight leading-snug">
            {DEGREE.title}
          </h3>
          <p style={BODY} className="mt-5 text-base md:text-lg font-medium text-white">{DEGREE.place}</p>
          <p style={BODY} className="mt-1 text-base text-mut">{DEGREE.meta}</p>
        </div>

        <div className="md:border-l md:border-line md:pl-12">
          <p style={BODY} className="text-sm text-mut">{DEGREE.scoreLabel}</p>
          <p style={HEAD} className="mt-1 text-5xl font-semibold tracking-tight grad-text">{DEGREE.score}</p>
        </div>
      </div>
    </article>
  );
}

function Small({ kind, title, score, sub, accent }) {
  return (
    <article
      className={`group relative rounded-3xl p-px bg-gradient-to-br ${accent} transition-shadow duration-500 hover:shadow-[0_30px_80px_-40px_rgba(139,109,255,0.55)]`}
    >
      <div className="h-full rounded-[calc(1.5rem-1px)] bg-card px-8 py-8">
        <span className={`block h-1 w-10 rounded-full bg-gradient-to-r ${accent}`} />
        <p style={BODY} className="mt-5 text-sm text-mut">{kind}</p>
        <h3 style={HEAD} className="mt-1 text-xl font-semibold tracking-tight">{title}</h3>
        {score && (
          <p style={HEAD} className="mt-4 text-3xl font-semibold tracking-tight">{score}</p>
        )}
        {sub && <p style={BODY} className="mt-4 text-base font-medium text-white">{sub}</p>}
      </div>
    </article>
  );
}

export default function Education() {
  return (
    <section id="education" className="section">
      <style>{FONT_CSS}</style>
      {/* same centered width as the Hero, Skills and Projects, so left and right edges line up */}
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <header className="mb-12 max-w-2xl">
            <span className="block h-px w-12 bg-gradient-to-r from-acc to-acc2" />
            <h2 style={HEAD} className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              Education
            </h2>
            <p style={BODY} className="mt-3 text-base md:text-lg text-mut leading-relaxed">
              Formal training in computer science, backed by industry-recognised certification.
            </p>
          </header>

          <div className="grid gap-6">
            <Degree />
            <div className="grid gap-6 md:grid-cols-3 items-stretch">
              {OTHERS.map((o) => (
                <Small key={o.title} {...o} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}