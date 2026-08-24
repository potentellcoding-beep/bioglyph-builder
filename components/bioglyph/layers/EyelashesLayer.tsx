import { EYE_Y, LEFT_EYE_X, RIGHT_EYE_X } from "@/lib/layout";

function lashesForEye(cx: number, cy: number, count: number, flip: boolean) {
  const lashes = [];
  const s = flip ? -1 : 1;
  // fan out further as more lashes are added so they stay evenly spaced
  // instead of crowding together at a fixed arc width.
  const centerDeg = -25;
  const angleStep = 14;
  const span = Math.min(120, (count - 1) * angleStep);
  const startDeg = centerDeg - span / 2;
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const angleDeg = startDeg + t * span;
    const rad = (angleDeg * Math.PI) / 180;
    const baseX = cx + s * 16 * Math.cos(rad);
    const baseY = cy - 18 - 4 * Math.sin(rad);
    const tipX = baseX + s * 10 * Math.cos(rad);
    const tipY = baseY - 10 - 3 * Math.sin(rad);
    lashes.push(
      <line
        key={i}
        x1={baseX}
        y1={baseY}
        x2={tipX}
        y2={tipY}
        stroke="#1a1a1a"
        strokeWidth={2}
        strokeLinecap="round"
      />
    );
  }
  return lashes;
}

export default function EyelashesLayer({ count }: { count: number | null }) {
  if (!count || count <= 0) return null;

  const perEye = Math.ceil(count / 2);
  const otherEye = count - perEye;

  return (
    <g>
      {lashesForEye(LEFT_EYE_X, EYE_Y, perEye, true)}
      {lashesForEye(RIGHT_EYE_X, EYE_Y, otherEye || perEye, false)}
    </g>
  );
}
