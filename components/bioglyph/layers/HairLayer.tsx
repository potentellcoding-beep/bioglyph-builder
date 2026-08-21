import { HAIR_COLORS } from "@/lib/constants";
import { FACE_CX, FACE_CY, FACE_H, FACE_W } from "@/lib/layout";
import { HairLength, HairTexture } from "@/lib/types";

// legend: Blonde = straight strand, Black = loose curl, Brunette = zigzag,
// Red = tight coil (spring) — each hair color has its own strand shape.
const LENGTH_PX: Record<HairLength, number> = {
  short: 34,
  medium: 54,
  long: 78,
};

function strandPath(
  bx: number,
  by: number,
  dx: number,
  dy: number,
  len: number,
  texture: HairTexture
): string {
  const px = -dy;
  const py = dx;

  if (texture === "straight") {
    return `M ${bx} ${by} L ${bx + dx * len} ${by + dy * len}`;
  }

  if (texture === "zigzag") {
    const n = 4;
    let d = `M ${bx} ${by}`;
    for (let i = 1; i <= n; i++) {
      const t = (i / n) * len;
      const side = i % 2 === 0 ? 1 : -1;
      const amp = i === n ? 0 : 6;
      const x = bx + dx * t + px * side * amp;
      const y = by + dy * t + py * side * amp;
      d += ` L ${x} ${y}`;
    }
    return d;
  }

  if (texture === "coil") {
    const n = 7;
    let d = `M ${bx} ${by}`;
    for (let i = 1; i <= n; i++) {
      const t = (i / n) * len;
      const side = i % 2 === 0 ? 1 : -1;
      const amp = i === n ? 0 : 4.5;
      const x = bx + dx * t + px * side * amp;
      const y = by + dy * t + py * side * amp;
      d += ` L ${x} ${y}`;
    }
    return d;
  }

  // curl: straight run then a loose loop near the tip
  const runX = bx + dx * len * 0.55;
  const runY = by + dy * len * 0.55;
  const r = len * 0.24;
  const c1x = runX + dx * r * 0.6 + px * r;
  const c1y = runY + dy * r * 0.6 + py * r;
  const c2x = runX + dx * r * 1.4 + px * r * 1.3;
  const c2y = runY + dy * r * 1.4 + py * r * 1.3;
  const loopEndX = runX + dx * r * 0.3 - px * r * 0.2;
  const loopEndY = runY + dy * r * 0.3 - py * r * 0.2;
  return `M ${bx} ${by} L ${runX} ${runY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${loopEndX} ${loopEndY}`;
}

export default function HairLayer({
  strandCount,
  color,
  length,
}: {
  strandCount: number | null;
  color: string | null;
  length: HairLength | null;
}) {
  if (!strandCount || !color || !length) return null;

  const texture: HairTexture =
    HAIR_COLORS.find((c) => c.value === color)?.texture ?? "straight";

  const rx = FACE_W / 2 + 4;
  const ry = FACE_H / 2 + 4;
  const strandLen = LENGTH_PX[length];

  const strands = [];
  // keep the whole spread in the upper half of the head so no strand ever
  // starts below the eye line (which read as hair growing from the bottom).
  const startDeg = 170;
  const endDeg = 10;
  const n = Math.max(1, strandCount);

  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const deg = startDeg + (endDeg - startDeg) * t;
    const rad = (deg * Math.PI) / 180;
    const baseX = FACE_CX + rx * Math.cos(rad);
    const baseY = FACE_CY - ry * Math.sin(rad) * 0.92;

    const outX = Math.cos(rad);
    const outY = -Math.sin(rad);

    strands.push(
      <path
        key={i}
        d={strandPath(baseX, baseY, outX, outY, strandLen, texture)}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  }

  return <g>{strands}</g>;
}
