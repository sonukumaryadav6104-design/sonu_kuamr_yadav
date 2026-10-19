import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w, h, raf;
    const mouse = { x: -999, y: -999 };
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    const count = window.innerWidth < 640 ? 40 : 75;
    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const line = (a, b, alpha) => {
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = ctx.strokeStyle = "#8b6dff";
      pts.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(p.x - pts[j].x, p.y - pts[j].y);
          if (d < 110) line(p, pts[j], (1 - d / 110) * 0.25);
        }
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dm < 150) line(p, mouse, (1 - dm / 150) * 0.5);
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 z-0 pointer-events-none" />;
}
