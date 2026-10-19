import { profile } from "../data.js";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line text-center text-mut py-10 px-6">
      © {new Date().getFullYear()} {profile.name} ·{" "}
      {profile.socials.map((s, i) => (
        <span key={s.label}>
          <a href={s.href} target="_blank" rel="noreferrer" className="text-acc hover:underline">{s.label}</a>
          {i < profile.socials.length - 1 && " · "}
        </span>
      ))}
    </footer>
  );
}
