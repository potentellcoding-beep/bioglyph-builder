import { MOUTH_CX, MOUTH_CY } from "@/lib/layout";
import { ScienceFeeling } from "@/lib/types";

const STROKE = "#3a2a1c";

export default function MouthLayer({ feeling }: { feeling: ScienceFeeling | null }) {
  if (!feeling) return null;

  switch (feeling) {
    case "love":
      return (
        <path
          d={`M ${MOUTH_CX - 38} ${MOUTH_CY - 6} Q ${MOUTH_CX} ${MOUTH_CY + 34} ${MOUTH_CX + 38} ${MOUTH_CY - 6} Q ${MOUTH_CX} ${MOUTH_CY + 10} ${MOUTH_CX - 38} ${MOUTH_CY - 6} Z`}
          fill="#a83b3b"
          stroke={STROKE}
          strokeWidth={3}
          strokeLinejoin="round"
        />
      );
    case "fine":
      return (
        <line
          x1={MOUTH_CX - 26}
          y1={MOUTH_CY}
          x2={MOUTH_CX + 26}
          y2={MOUTH_CY}
          stroke={STROKE}
          strokeWidth={5}
          strokeLinecap="round"
        />
      );
    case "scary":
      return (
        <path
          d={`M ${MOUTH_CX - 26} ${MOUTH_CY - 4}
              L ${MOUTH_CX - 13} ${MOUTH_CY + 10}
              L ${MOUTH_CX} ${MOUTH_CY - 4}
              L ${MOUTH_CX + 13} ${MOUTH_CY + 10}
              L ${MOUTH_CX + 26} ${MOUTH_CY - 4}`}
          fill="none"
          stroke={STROKE}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "dislike":
      return (
        <path
          d={`M ${MOUTH_CX - 30} ${MOUTH_CY + 14} Q ${MOUTH_CX} ${MOUTH_CY - 4} ${MOUTH_CX + 30} ${MOUTH_CY + 14}`}
          fill="none"
          stroke={STROKE}
          strokeWidth={5}
          strokeLinecap="round"
        />
      );
    default:
      return null;
  }
}
