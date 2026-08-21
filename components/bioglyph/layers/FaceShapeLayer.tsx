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
    case "rectangle":
      return (
        <rect
          x={cx - w / 2.4}
          y={cy - h / 2}
          width={w / 1.2}
          height={h}
          rx={28}
          ry={28}
          {...common}
        />
      );
    case "diamond": {
      const top = cy - h / 2;
      const bottom = cy + h / 2;
      const left = cx - w / 2;
      const right = cx + w / 2;
      const midTop = cy - h * 0.14;
      const midBottom = cy + h * 0.18;
      const d = `
        M ${cx} ${top}
        C ${cx + w * 0.32} ${top + h * 0.06}, ${right} ${midTop - 20}, ${right} ${midTop}
        C ${right} ${midBottom + 10}, ${cx + w * 0.22} ${bottom - h * 0.1}, ${cx} ${bottom}
        C ${cx - w * 0.22} ${bottom - h * 0.1}, ${left} ${midBottom + 10}, ${left} ${midTop}
        C ${left} ${midTop - 20}, ${cx - w * 0.32} ${top + h * 0.06}, ${cx} ${top}
        Z
      `;
      return <path d={d} {...common} />;
    }
    case "heart": {
      const top = cy - h / 2;
      const bottom = cy + h / 2;
      const left = cx - w / 2;
      const right = cx + w / 2;
      const dipY = top + h * 0.16;
      const d = `
        M ${cx} ${top + h * 0.06}
        C ${cx - w * 0.12} ${top - h * 0.02}, ${left} ${top + h * 0.02}, ${left} ${dipY + h * 0.06}
        C ${left} ${top + h * 0.42}, ${cx - w * 0.18} ${top + h * 0.62}, ${cx} ${bottom}
        C ${cx + w * 0.18} ${top + h * 0.62}, ${right} ${top + h * 0.42}, ${right} ${dipY + h * 0.06}
        C ${right} ${top + h * 0.02}, ${cx + w * 0.12} ${top - h * 0.02}, ${cx} ${top + h * 0.06}
        Z
      `;
      return <path d={d} {...common} />;
    }
    default:
      return null;
  }
}
