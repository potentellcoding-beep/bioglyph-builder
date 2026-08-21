import { CHEEK_Y, LEFT_CHEEK_X, RIGHT_CHEEK_X } from "@/lib/layout";

// deterministic pseudo-random so the layout doesn't shift on re-render
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 999.7) * 10000;
  return x - Math.floor(x);
}

function scatterFreckles(cx: number, cy: number, count: number, seedOffset: number) {
  const dots = [];
  for (let i = 0; i < count; i++) {
    const rx = 26 * Math.sqrt(pseudoRandom(i + seedOffset));
    const angle = pseudoRandom(i + seedOffset + 50) * Math.PI * 2;
    const x = cx + rx * Math.cos(angle);
    const y = cy + rx * 0.7 * Math.sin(angle);
    dots.push(<circle key={i} cx={x} cy={y} r={1.8} fill="#8a5a2b" />);
  }
  return dots;
}

export default function FrecklesLayer({
  count,
  split,
}: {
  count: number | null;
  split: "split" | "single" | null;
}) {
  if (!count || count <= 0 || !split) return null;

  if (split === "split") {
    const half = Math.ceil(count / 2);
    const otherHalf = count - half;
    return (
      <g>
        {scatterFreckles(LEFT_CHEEK_X, CHEEK_Y, half, 0)}
        {scatterFreckles(RIGHT_CHEEK_X, CHEEK_Y, otherHalf, 200)}
      </g>
    );
  }

  return <g>{scatterFreckles(RIGHT_CHEEK_X, CHEEK_Y, count, 0)}</g>;
}
