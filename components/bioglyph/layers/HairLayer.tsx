import { HAIR_COLORS } from "@/lib/constants";
import { FACE_CX, FACE_CY, FACE_H, FACE_W } from "@/lib/layout";
import { HairLength, HairTexture } from "@/lib/types";

// legend: Blonde = straight strand, Black = loose curls, Brunette = zigzag,
// Red = stacked circles (coiled spring) — each hair color has its own strand shape.
const LENGTH_PX: Record<HairLength, number> = {
  short: 34,
  medium: 54,
  long: 78,
};

function loopSegment(
  startX: number,
  startY: number,
  dx: number,
  dy: number,
  px: number,
  py: number,
  r: number
) {
  const c1x = startX + dx * r * 0.6 + px * r;
  const c1y = startY + dy * r * 0.6 + py * r;
  const c2x = startX + dx * r * 1.4 + px * r * 1.3;
  const c2y = startY + dy * r * 1.4 + py * r * 1.3;
  const endX = startX + dx * r * 0.3 - px * r * 0.2;
  const endY = startY + dy * r * 0.3 - py * r * 0.2;
  return { path: ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`, endX, endY };
}

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

  // curl: a chain of three loose loops running out from the head
  const loops = 3;
  const r = len * 0.13;
  const runLen = len * 0.18;
  let d = `M ${bx} ${by}`;
  let curX = bx;
  let curY = by;
  for (let i = 0; i < loops; i++) {
    const runX = curX + dx * runLen;
    const runY = curY + dy * runLen;
    d += ` L ${runX} ${runY}`;
    const seg = loopSegment(runX, runY, dx, dy, px, py, r);
    d += seg.path;
    curX = seg.endX;
    curY = seg.endY;
  }
  return d;
}

function coilCircles(
  bx: number,
  by: number,
  dx: number,
  dy: number,
  len: number,
  color: string,
  key: number
) {
  const r = 5;
  const spacing = r * 1.15;
  const n = Math.max(3, Math.round(len / spacing) + 1);
  const circles = [];
  for (let i = 0; i < n; i++) {
    const t = Math.min(i * spacing, len);
    const x = bx + dx * t;
    const y = by + dy * t;
    circles.push(
      <circle
        key={`${key}-${i}`}
        cx={x}
        cy={y}
        r={r}
        fill={color}
        stroke="#3a2a1c"
        strokeWidth={1}
      />
    );
  }
  return circles;
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

    if (texture === "coil") {
      strands.push(
        <g key={i}>{coilCircles(baseX, baseY, outX, outY, strandLen, color, i)}</g>
      );
    } else {
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
  }

  return <g>{strands}</g>;
}
