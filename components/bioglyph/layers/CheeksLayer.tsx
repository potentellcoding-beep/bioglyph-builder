import { ICE_CREAM_FLAVORS } from "@/lib/constants";
import { CHEEK_Y, LEFT_CHEEK_X, RIGHT_CHEEK_X } from "@/lib/layout";

const STROKE = "#3a2a1c";

// legend: Vanilla = open circles, Chocolate = crescents facing the nose,
// Other = small right-angle tick marks. Left/right cheeks mirror each other.
function flavorIcon(flavor: string, cx: number, cy: number, side: "l" | "r") {
  const mirror = side === "l" ? 1 : -1;

  switch (flavor) {
    case "chocolate":
      // crescents bulge toward the nose, mirrored per cheek
      return (
        <path
          d={`M ${cx} ${cy - 8} A 8 8 0 0 ${side === "l" ? 1 : 0} ${cx} ${cy + 8}`}
          fill="none"
          stroke={STROKE}
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      );
    case "other":
      return (
        <path
          d={`M ${cx - mirror * 7} ${cy - 7} L ${cx - mirror * 7} ${cy + 7} L ${
            cx + mirror * 5
          } ${cy + 7}`}
          fill="none"
          stroke={STROKE}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "vanilla":
    default:
      return <circle cx={cx} cy={cy} r={8} fill="none" stroke={STROKE} strokeWidth={2.5} />;
  }
}

export default function CheeksLayer({ flavor }: { flavor: string | null }) {
  if (!flavor) return null;
  const found = ICE_CREAM_FLAVORS.find((f) => f.value === flavor);
  if (!found) return null;

  return (
    <g>
      <ellipse cx={LEFT_CHEEK_X} cy={CHEEK_Y} rx={22} ry={16} fill={found.color} opacity={0.55} />
      <ellipse cx={RIGHT_CHEEK_X} cy={CHEEK_Y} rx={22} ry={16} fill={found.color} opacity={0.55} />
      {flavorIcon(flavor, LEFT_CHEEK_X, CHEEK_Y, "l")}
      {flavorIcon(flavor, RIGHT_CHEEK_X, CHEEK_Y, "r")}
    </g>
  );
}
