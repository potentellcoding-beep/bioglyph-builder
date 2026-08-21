import { ACTIVITY_OPTIONS } from "@/lib/constants";
import {
  CHAIN_DIP_START,
  CHAIN_DIP_STEP,
  FACE_CX,
  NECK_COLLAR_DX,
  NECK_Y,
} from "@/lib/layout";
import { starPoints } from "@/lib/svgShapes";
import { CharmShape } from "@/lib/types";

const CHARM_COLOR = "#f2c14e";
const CHAIN_COLOR = "#9a9a9a";
const STROKE = "#3a2a1c";

function Pendant({ cx, cy, shape }: { cx: number; cy: number; shape: CharmShape }) {
  const r = 13;
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
          x={cx - r * 0.85}
          y={cy - r * 0.85}
          width={r * 1.7}
          height={r * 1.7}
          fill={CHARM_COLOR}
          stroke={STROKE}
          strokeWidth={2.5}
        />
      );
    default:
      return null;
  }
}

// each activity adds its own necklace: a chain hung from the collar that
// dips further down than the last, so multiple activities layer up.
function Chain({
  dipY,
  shape,
}: {
  dipY: number;
  shape: CharmShape;
}) {
  const x1 = FACE_CX - NECK_COLLAR_DX;
  const x2 = FACE_CX + NECK_COLLAR_DX;
  const d = `M ${x1} ${NECK_Y} L ${FACE_CX} ${dipY} L ${x2} ${NECK_Y}`;

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={CHAIN_COLOR}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1 6"
      />
      <Pendant cx={FACE_CX} cy={dipY + 6} shape={shape} />
    </g>
  );
}

export default function CharmsLayer({ activityIds }: { activityIds: string[] }) {
  if (!activityIds.length) return null;

  const activities = ACTIVITY_OPTIONS.filter((a) => activityIds.includes(a.id));

  return (
    <g>
      {activities.map((a, i) => (
        <Chain
          key={a.id}
          dipY={NECK_Y + CHAIN_DIP_START + i * CHAIN_DIP_STEP}
          shape={a.shape}
        />
      ))}
    </g>
  );
}
