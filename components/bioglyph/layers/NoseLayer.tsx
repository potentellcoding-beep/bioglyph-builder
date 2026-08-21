import { NOSE_CX, NOSE_CY } from "@/lib/layout";
import { Transport } from "@/lib/types";

const STROKE = "#3a2a1c";
const FILL = "#3a3a3a";

export default function NoseLayer({ transport }: { transport: Transport | null }) {
  if (!transport) return null;

  switch (transport) {
    case "bus":
      // upright triangle
      return (
        <polygon
          points={`${NOSE_CX},${NOSE_CY - 16} ${NOSE_CX + 16},${NOSE_CY + 14} ${NOSE_CX - 16},${NOSE_CY + 14}`}
          fill={FILL}
          stroke={STROKE}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
      );
    case "car":
      // upside-down triangle
      return (
        <polygon
          points={`${NOSE_CX},${NOSE_CY + 16} ${NOSE_CX + 16},${NOSE_CY - 14} ${NOSE_CX - 16},${NOSE_CY - 14}`}
          fill={FILL}
          stroke={STROKE}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
      );
    case "bike":
      return (
        <circle
          cx={NOSE_CX}
          cy={NOSE_CY}
          r={15}
          fill={FILL}
          stroke={STROKE}
          strokeWidth={2.5}
        />
      );
    case "walk":
      return (
        <rect
          x={NOSE_CX - 14}
          y={NOSE_CY - 14}
          width={28}
          height={28}
          fill={FILL}
          stroke={STROKE}
          strokeWidth={2.5}
        />
      );
    default:
      return null;
  }
}
