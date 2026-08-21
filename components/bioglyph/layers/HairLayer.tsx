import { FACE_CX, FACE_CY, FACE_H, FACE_W } from "@/lib/layout";
import { HairLength } from "@/lib/types";

// dotted lines radiating from the top of the head, one per birth month —
// short/medium/long control how far each dotted strand reaches.
const LENGTH_PX: Record<HairLength, number> = {
  short: 34,
  medium: 54,
  long: 78,
};

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

  const rx = FACE_W / 2 + 4;
  const ry = FACE_H / 2 + 4;
  const strandLen = LENGTH_PX[length];

  const strands = [];
  const startDeg = 200;
  const endDeg = -20;
  const n = Math.max(1, strandCount);

  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const deg = startDeg + (endDeg - startDeg) * t;
    const rad = (deg * Math.PI) / 180;
    const baseX = FACE_CX + rx * Math.cos(rad);
    const baseY = FACE_CY - ry * Math.sin(rad) * 0.92;

    const outX = Math.cos(rad);
    const outY = -Math.sin(rad);
    const tipX = baseX + outX * strandLen;
    const tipY = baseY + outY * strandLen;

    strands.push(
      <line
        key={i}
        x1={baseX}
        y1={baseY}
        x2={tipX}
        y2={tipY}
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray="0.5 8"
      />
    );
  }

  return <g>{strands}</g>;
}
