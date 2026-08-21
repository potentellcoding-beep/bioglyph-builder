import { ACTIVITY_OPTIONS } from "@/lib/constants";
import { CHARM_ROW_Y, FACE_CX } from "@/lib/layout";
import { starPoints } from "@/lib/svgShapes";
import { CharmShape } from "@/lib/types";

const CHARM_COLOR = "#f2c14e";
const STROKE = "#3a2a1c";

function Charm({ cx, cy, shape }: { cx: number; cy: number; shape: CharmShape }) {
  const r = 14;
  switch (shape) {
    case "star":
      return (
        <polygon
          points={starPoints(cx, cy, r, r * 0.45)}
          fill={CHARM_COLOR}
          stroke={STROKE}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
      );
    case "circle":
      return <circle cx={cx} cy={cy} r={r * 0.75} fill={CHARM_COLOR} stroke={STROKE} strokeWidth={2.5} />;
    case "rectangle":
      return (
        <rect
          x={cx - r}
          y={cy - r * 0.65}
          width={r * 2}
          height={r * 1.3}
          fill={CHARM_COLOR}
          stroke={STROKE}
          strokeWidth={2.5}
        />
      );
    default:
      return null;
  }
}

export default function CharmsLayer({ activityIds }: { activityIds: string[] }) {
  if (!activityIds.length) return null;

  const activities = ACTIVITY_OPTIONS.filter((a) => activityIds.includes(a.id));
  const spacing = 40;
  const totalWidth = (activities.length - 1) * spacing;
  const startX = FACE_CX - totalWidth / 2;

  return (
    <g>
      {activities.map((a, i) => (
        <Charm key={a.id} cx={startX + i * spacing} cy={CHARM_ROW_Y} shape={a.shape} />
      ))}
    </g>
  );
}
