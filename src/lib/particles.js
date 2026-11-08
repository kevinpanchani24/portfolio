// Particle field maths, kept separate from React so each piece stays small and testable.
const LINK = 130;

export function createPoints(w, h) {
  const count = Math.round(Math.min(80, (w * h) / 18000));
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    z: 0.4 + Math.random() * 0.6, // depth: nearer points are bigger and brighter
  }));
}

export function stepPoints(points, w, h) {
  for (const p of points) {
    p.x += p.vx * p.z;
    p.y += p.vy * p.z;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
  }
}

const glowAt = (p, mouse) => {
  const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
  return d < 180 ? 1 - d / 180 : 0;
};

function drawLinks(ctx, points, i, glow) {
  const a = points[i];
  for (let j = i + 1; j < points.length; j++) {
    const b = points[j];
    const d = Math.hypot(a.x - b.x, a.y - b.y);
    if (d >= LINK) continue;
    ctx.strokeStyle = `rgba(255,255,255,${(1 - d / LINK) * (0.08 + glow * 0.3)})`;
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
  }
}

export function drawPoints(ctx, points, mouse) {
  ctx.lineWidth = 1;
  points.forEach((a, i) => {
    const glow = glowAt(a, mouse);
    ctx.fillStyle = `rgba(255,255,255,${(0.18 + glow * 0.6) * a.z})`;
    ctx.beginPath(); ctx.arc(a.x, a.y, (1 + glow) * a.z * 1.4, 0, Math.PI * 2); ctx.fill();
    drawLinks(ctx, points, i, glow);
  });
}
