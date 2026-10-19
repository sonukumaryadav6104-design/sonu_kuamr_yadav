import Reveal from "./Reveal.jsx";

/* Fonts load with the component: Sora for headings, Plus Jakarta Sans for text. */
const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&family=Sora:wght@500;600;700&display=swap');`;
const HEAD = { fontFamily: "'Sora', system-ui, sans-serif" };
const BODY = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

/* Edit the copy here. 4 rows per track keeps each box a clean 2 x 2 grid. */
const TRACKS = [
  {
    id: "skills",
    title: "Full-stack engineering",
    lead: "Interfaces, APIs and data that hold up in real use.",
    accent: "from-acc to-acc2",
    rows: [
      { task: "Build responsive, fast front ends", tools: ["React", "Tailwind CSS"] },
      { task: "Design secure REST APIs with authentication", tools: ["Node.js", "Express", "JWT"] },
      { task: "Model and query application data", tools: ["MongoDB", "Mongoose"] },
      { task: "Ship and maintain code with a clean workflow", tools: ["Git", "GitHub"] },
    ],
  },
  {
    id: "ai-skills",
    title: "Applied AI and machine learning",
    lead: "Models and retrieval connected to workflows people actually use.",
    accent: "from-acc2 to-acc",
    rows: [
      { task: "Build generative AI apps with LLMs and prompt design", tools: ["GenAI", "Groq", "LangChain"] },
      { task: "Design agentic AI workflows that plan, use tools and self-correct", tools: ["Agentic AI", "LangGraph", "LangSmith"] },
      { task: "Build retrieval-based assistants over private data", tools: ["RAG", "Vector search"] },
      { task: "Train and evaluate classical ML models", tools: ["Python", "scikit-learn"] },
    ],
  },
];

function Box({ id, title, lead, accent, rows }) {
  return (
    <article
      id={id === "skills" ? undefined : id}
      className={`group relative rounded-3xl p-px bg-gradient-to-br ${accent} transition-shadow duration-500 hover:shadow-[0_30px_80px_-40px_rgba(139,109,255,0.55)]`}
    >
      {/* the gradient is a hairline: the inner panel sits 1px inside it */}
      <div className="rounded-[calc(1.5rem-1px)] bg-card px-8 py-9 md:px-12 md:py-11 grid lg:grid-cols-[0.85fr_1.15fr]">
        {/* left: what this track is. Padding on both sides of the divider is equal (lg:pr-12 / lg:pl-12). */}
        <div className="pb-8 lg:pb-0 lg:pr-12">
          <span className={`block h-1 w-12 rounded-full bg-gradient-to-r ${accent}`} />
          <h3 style={HEAD} className="mt-6 text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
            {title}
          </h3>
          <p style={BODY} className="mt-3 text-base md:text-lg text-mut leading-relaxed max-w-sm">
            {lead}
          </p>
        </div>

        {/* right: what it is used for */}
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-7 content-center lg:border-l lg:border-line lg:pl-12">
          {rows.map((r) => (
            <li key={r.task} className="border-t border-line pt-5">
              <p style={BODY} className="text-base md:text-lg font-medium text-white leading-snug">
                {r.task}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {r.tools.map((t) => (
                  <span
                    key={t}
                    style={BODY}
                    className="rounded-lg border border-line bg-white/[0.03] px-3 py-1 text-sm text-mut transition-colors group-hover:text-white/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <style>{FONT_CSS}</style>
      {/* same centered width as the Hero, so left and right edges line up */}
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <header className="mb-12 max-w-2xl">
            <span className="block h-px w-12 bg-gradient-to-r from-acc to-acc2" />
            <h2 style={HEAD} className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              Technical expertise
            </h2>
            <p style={BODY} className="mt-3 text-base md:text-lg text-mut leading-relaxed">
              Two focused specializations, applied to products that are built, tested and shipped.
            </p>
          </header>

          <div className="grid gap-6">
            {TRACKS.map((t) => (
              <Box key={t.id} {...t} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}