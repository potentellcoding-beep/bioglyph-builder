import { EYE_COLORS } from "@/lib/constants";
import { darken, lighten } from "@/lib/color";
import { EYE_Y, LEFT_EYE_X, RIGHT_EYE_X } from "@/lib/layout";
import { EyeGaze, EyeStyle } from "@/lib/types";

const GAZE_OFFSET: Record<EyeGaze, [number, number]> = {
  up: [0, -6],
  down: [0, 6],
  left: [-6, 0],
  right: [6, 0],
};

export default function EyesLayer({
  color,
  style,
}: {
  color: string | null;
  style: EyeStyle | null;
}) {
  if (!color || !style) return null;

  const isOval = style === "oval";
  const rx = isOval ? 26 : 20;
  const ry = 20;

  const gaze = EYE_COLORS.find((c) => c.value === color)?.gaze ?? "up";
  const [gx, gy] = GAZE_OFFSET[gaze];

  // layer a lighter outer ring + the true color + a black pupil so the
  // chosen eye color always reads clearly, even for very dark colors that
  // would otherwise blend into the pupil. the whole iris/pupil group shifts
  // toward the color's gaze direction so each color visibly looks somewhere.
  const irisOuter = lighten(color, 0.18);
  const irisRing = darken(color, 0.3);

  const eye = (cx: number, key: string) => (
    <g key={key}>
      <ellipse cx={cx} cy={EYE_Y} rx={rx} ry={ry} fill="#ffffff" stroke="#3a2a1c" strokeWidth={3.5} />
      <circle cx={cx + gx} cy={EYE_Y + gy} r={11} fill={irisOuter} />
      <circle cx={cx + gx} cy={EYE_Y + gy} r={9} fill={color} stroke={irisRing} strokeWidth={1} />
      <circle cx={cx + gx} cy={EYE_Y + gy} r={4} fill="#000000" />
      <circle cx={cx + gx - 3} cy={EYE_Y + gy - 3} r={1.8} fill="#ffffff" />
      {isOval && (
        <ellipse
          cx={cx}
          cy={EYE_Y}
          rx={rx + 6}
          ry={ry + 6}
          fill="none"
          stroke="#3a2a1c"
          strokeWidth={3}
        />
      )}
    </g>
  );

  return (
    <g>
      {eye(LEFT_EYE_X, "left")}
      {eye(RIGHT_EYE_X, "right")}
      {isOval && (
        <line
          x1={LEFT_EYE_X + rx + 6}
          y1={EYE_Y}
          x2={RIGHT_EYE_X - rx - 6}
          y2={EYE_Y}
          stroke="#3a2a1c"
          strokeWidth={3}
        />
      )}
    </g>
  );
}
