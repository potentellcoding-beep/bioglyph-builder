import { FACE_CX, FACE_CY, FACE_H, FACE_W } from "@/lib/layout";
import { FaceShape } from "@/lib/types";

const SKIN = "#f6d9b8";
const STROKE = "#3a2a1c";

export default function FaceShapeLayer({ shape }: { shape: FaceShape | null }) {
  if (!shape) return null;

  const cx = FACE_CX;
  const cy = FACE_CY;
  const w = FACE_W;
  const h = FACE_H;
  const common = { fill: SKIN, stroke: STROKE, strokeWidth: 4, strokeLinejoin: "round" as const };

  switch (shape) {
    case "oval":
      return <ellipse cx={cx} cy={cy} rx={w / 2} ry={h / 2} {...common} />;
    case "round":
      return <ellipse cx={cx} cy={cy} rx={h / 2.15} ry={h / 2} {...common} />;
    case "square":
      return (
        <rect
          x={cx - w / 2}
          y={cy - h / 2}
          width={w}
          height={h}
          rx={36}
          ry={36}
          {...common}
        />
      );
    default:
      return null;
  }
}
