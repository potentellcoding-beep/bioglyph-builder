import { EYEBROW_OPTIONS } from "@/lib/constants";
import { EYEBROW_Y, LEFT_EYE_X, RIGHT_EYE_X } from "@/lib/layout";
import { EyebrowShape } from "@/lib/types";

function browPath(cx: number, y: number, shape: EyebrowShape, flip: boolean): string {
  const s = flip ? -1 : 1;

  switch (shape) {
    case "arc":
      return `M ${cx - 22} ${y + 6} Q ${cx} ${y - 10} ${cx + 22} ${y + 6}`;
    case "peak":
      return `M ${cx - 20} ${y + 6} L ${cx} ${y - 10} L ${cx + 20} ${y + 6}`;
    case "doublePeak":
      return `M ${cx - 20} ${y + 4} L ${cx - 10} ${y - 10} L ${cx} ${y + 2} L ${cx + 10} ${y - 10} L ${cx + 20} ${y + 4}`;
    case "mShape":
      return `M ${cx - 20} ${y + 4} Q ${cx - 12} ${y - 12} ${cx - 4} ${y + 2} Q ${cx + 4} ${y - 12} ${cx + 12} ${y + 2} Q ${cx + 16} ${y - 6} ${cx + 20} ${y + 2}`;
    case "slanted":
      // inner corners (toward the nose) sit higher for a serious look
      return `M ${cx - 18 * s} ${y + 8} L ${cx + 18 * s} ${y - 8}`;
    default:
      return "";
  }
}

export default function EyebrowsLayer({ value }: { value: string | null }) {
  if (!value) return null;
  const option = EYEBROW_OPTIONS.find((o) => o.value === value);
  if (!option) return null;

  const brow = (cx: number, key: string, flip: boolean) => (
    <path
      key={key}
      d={browPath(cx, EYEBROW_Y, option.shape, flip)}
      stroke={option.color}
      strokeWidth={6}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  );

  return (
    <g>
      {brow(LEFT_EYE_X, "left", false)}
      {brow(RIGHT_EYE_X, "right", true)}
    </g>
  );
}
