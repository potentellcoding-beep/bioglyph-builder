import { ICE_CREAM_FLAVORS } from "@/lib/constants";
import { CHEEK_Y, LEFT_CHEEK_X, RIGHT_CHEEK_X } from "@/lib/layout";

// each flavor gets its own mix-in texture so the cheek shape itself signals
// the flavor, not just the blush color.
function flavorTexture(flavor: string, cx: number, cy: number, side: string) {
  const key = (i: number) => `${side}-${i}`;

  switch (flavor) {
    case "chocolate":
      return [
        [-8, -4],
        [5, 3],
        [-3, 7],
        [9, -6],
      ].map(([dx, dy], i) => (
        <circle key={key(i)} cx={cx + dx} cy={cy + dy} r={1.7} fill="#3a2413" />
      ));
    case "strawberry":
      return [
        [-7, -3],
        [6, -5],
        [0, 6],
        [8, 4],
        [-5, 6],
      ].map(([dx, dy], i) => (
        <circle key={key(i)} cx={cx + dx} cy={cy + dy} r={1} fill="#c62b3d" />
      ));
    case "mint":
      return [
        [-6, -5],
        [5, -2],
        [-2, 5],
        [8, 5],
      ].map(([dx, dy], i) => (
        <rect
          key={key(i)}
          x={cx + dx - 1.4}
          y={cy + dy - 1.4}
          width={2.8}
          height={2.8}
          fill="#2f5233"
          transform={`rotate(20 ${cx + dx} ${cy + dy})`}
        />
      ));
    case "cookies_cream":
      return [
        [-7, -2],
        [4, -6],
        [6, 5],
        [-3, 7],
      ].map(([dx, dy], i) => (
        <ellipse key={key(i)} cx={cx + dx} cy={cy + dy} rx={2.4} ry={1.9} fill="#4a3728" />
      ));
    case "rocky_road":
      return [
        <ellipse key={key(0)} cx={cx - 6} cy={cy - 2} rx={3} ry={2.2} fill="#f7f2e7" stroke="#c9bfa8" strokeWidth={0.5} />,
        <ellipse key={key(1)} cx={cx + 7} cy={cy + 4} rx={2.6} ry={2} fill="#f7f2e7" stroke="#c9bfa8" strokeWidth={0.5} />,
        <circle key={key(2)} cx={cx + 2} cy={cy - 5} r={1.6} fill="#6b4226" />,
        <circle key={key(3)} cx={cx - 2} cy={cy + 6} r={1.6} fill="#6b4226" />,
      ];
    case "vanilla":
    default:
      return [
        <path
          key={key(0)}
          d={`M ${cx - 10} ${cy} Q ${cx} ${cy - 6} ${cx + 10} ${cy}`}
          stroke="#e4c98f"
          strokeWidth={1.4}
          fill="none"
          opacity={0.6}
        />,
      ];
  }
}

export default function CheeksLayer({ flavor }: { flavor: string | null }) {
  if (!flavor) return null;
  const found = ICE_CREAM_FLAVORS.find((f) => f.value === flavor);
  if (!found) return null;

  return (
    <g opacity={0.85}>
      <ellipse cx={LEFT_CHEEK_X} cy={CHEEK_Y} rx={22} ry={16} fill={found.color} />
      <ellipse cx={RIGHT_CHEEK_X} cy={CHEEK_Y} rx={22} ry={16} fill={found.color} />
      {flavorTexture(flavor, LEFT_CHEEK_X, CHEEK_Y, "l")}
      {flavorTexture(flavor, RIGHT_CHEEK_X, CHEEK_Y, "r")}
    </g>
  );
}
