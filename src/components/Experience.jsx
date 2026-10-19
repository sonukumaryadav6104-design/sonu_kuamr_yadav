import Reveal from "./Reveal.jsx";
import { experience } from "../data.js";

const FONT_CSS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&family=Sora:wght@500;600;700&display=swap');`;
const HEAD = { fontFamily: "'Sora', system-ui, sans-serif" };
const BODY = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

/* Everything shown here is read from `experience` in data.js. */
export default function Experience() {
  return (
    <section id="experience" className="section">
      <style>{FONT_CSS}</style>
      {/* same centered width as the other sections, so left and right edges line up */}
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <header className="mb-12 max-w-2xl">
            <span className="block h-px w-12 bg-gradient-to-r from-acc to-acc2" />
            <h2 style={HEAD} className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              Learning and certifications
            </h2>
            <p style={BODY} className="mt-3 text-base md:text-lg text-mut leading-relaxed">
              Formal training in computer science, backed by industry-recognised certifications.
            </p>
          </header>

          <div className="rounded-3xl p-px bg-gradient-to-br from-acc/60 via-line to-acc2/50">
            <ul className="divide-y divide-line rounded-[calc(1.5rem-1px)] bg-card">
              {experience.map((e) => (
                <li
                  key={e.title}
                  className="group grid gap-2 px-8 py-7 md:px-12 md:py-8 md:grid-cols-[0.8fr_1.6fr] md:gap-0 transition-colors hover:bg-white/[0.02]"
                >
                  {/* equal padding either side of the divider (md:pr-12 / md:pl-12) */}
                  <p style={BODY} className="text-sm md:text-base text-mut md:pr-12">
                    {e.period}
                  </p>
                  <div className="md:border-l md:border-line md:pl-12">
                    <h3 style={HEAD} className="text-lg md:text-xl font-semibold tracking-tight leading-snug">
                      {e.title}
                    </h3>
                    <p style={BODY} className="mt-2 text-base text-mut leading-relaxed">
                      {e.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}