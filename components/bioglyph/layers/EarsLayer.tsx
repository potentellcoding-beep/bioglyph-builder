import { EAR_Y, LEFT_EAR_X, RIGHT_EAR_X } from "@/lib/layout";
import { SiblingCounts } from "@/lib/types";

const SKIN = "#f6d9b8";
const STROKE = "#3a2a1c";

function EarShape({ cx, cy, flip }: { cx: number; cy: number; flip: boolean }) {
  const s = flip ? 1 : -1;
  const d = `
    M ${cx} ${cy - 38}
    C ${cx + s * 26} ${cy - 38}, ${cx + s * 30} ${cy - 6}, ${cx + s * 18} ${cy + 6}
    C ${cx + s * 10} ${cy + 12}, ${cx + s * 12} ${cy + 22}, ${cx} ${cy + 20}
    C ${cx - s * 14} ${cy + 18}, ${cx - s * 4} ${cy - 30}, ${cx} ${cy - 38}
    Z
  `;
  return <path d={d} fill={SKIN} stroke={STROKE} strokeWidth={3.5} strokeLinejoin="round" />;
}

function Dots({
  cx,
  zoneTop,
  count,
}: {
  cx: number;
  zoneTop: number;
  count: number;
}) {
  const dots = [];
  const perRow = 2;
  const spacing = 9;
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    const rowCount = Math.min(perRow, count - row * perRow);
    const rowOffset = ((rowCount - 1) * spacing) / 2;
    const x = cx - rowOffset + col * spacing;
    const y = zoneTop + row * spacing;
    dots.push(<circle key={i} cx={x} cy={y} r={3} fill="#c23b5a" />);
  }
  return <g>{dots}</g>;
}

export default function EarsLayer({ siblings }: { siblings: SiblingCounts }) {
  const { olderSisters, youngerSisters, olderBrothers, youngerBrothers } = siblings;
  const hasSister = olderSisters + youngerSisters > 0;
  const hasBrother = olderBrothers + youngerBrothers > 0;
  if (!hasSister && !hasBrother) return null;

  return (
    <g>
      {hasSister && <EarShape cx={LEFT_EAR_X} cy={EAR_Y} flip={false} />}
      {hasBrother && <EarShape cx={RIGHT_EAR_X} cy={EAR_Y} flip={true} />}
      {olderSisters > 0 && <Dots cx={LEFT_EAR_X} zoneTop={EAR_Y - 24} count={olderSisters} />}
      {youngerSisters > 0 && <Dots cx={LEFT_EAR_X} zoneTop={EAR_Y + 2} count={youngerSisters} />}
      {olderBrothers > 0 && <Dots cx={RIGHT_EAR_X} zoneTop={EAR_Y - 24} count={olderBrothers} />}
      {youngerBrothers > 0 && <Dots cx={RIGHT_EAR_X} zoneTop={EAR_Y + 2} count={youngerBrothers} />}
    </g>
  );
}
