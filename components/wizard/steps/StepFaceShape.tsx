"use client";

import { FACE_SHAPES } from "@/lib/constants";
import { BioglyphData } from "@/lib/types";
import OptionCard from "../OptionCard";
import FaceShapeLayer from "@/components/bioglyph/layers/FaceShapeLayer";

export default function StepFaceShape({
  data,
  update,
}: {
  data: BioglyphData;
  update: (patch: Partial<BioglyphData>) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800">What&apos;s your face shape?</h2>
      <p className="mt-1 text-slate-500">
        Look in a mirror, or think about your ID photo. Pick the shape that fits best.
      </p>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {FACE_SHAPES.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            selected={data.faceShape === opt.value}
            onClick={() => update({ faceShape: opt.value })}
          >
            <svg viewBox="0 0 400 480" className="h-20 w-20">
              <FaceShapeLayer shape={opt.value} />
            </svg>
          </OptionCard>
        ))}
      </div>
    </div>
  );
}
