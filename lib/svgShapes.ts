// Small helpers for generating SVG point strings for the charm shapes.

export function starPoints(cx: number, cy: number, outerR: number, innerR: number): string {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return points.join(" ");
}

export function trianglePoints(cx: number, cy: number, r: number): string {
  const points: string[] = [];
  for (let i = 0; i < 3; i++) {
    const angle = (Math.PI * 2 / 3) * i - Math.PI / 2;
    points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return points.join(" ");
}

export function diamondPoints(cx: number, cy: number, r: number): string {
  return `${cx},${cy - r} ${cx + r * 0.75},${cy} ${cx},${cy + r} ${cx - r * 0.75},${cy}`;
}

export function squarePoints(cx: number, cy: number, r: number): string {
  const s = r * 0.85;
  return `${cx - s},${cy - s} ${cx + s},${cy - s} ${cx + s},${cy + s} ${cx - s},${cy + s}`;
}
