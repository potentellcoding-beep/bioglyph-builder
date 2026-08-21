"use client";

import { SCIENCE_FEELINGS } from "@/lib/constants";
import { BioglyphData } from "@/lib/types";
import OptionCard from "../OptionCard";

export default function StepMouth({
  data,
  update,
}: {
  data: BioglyphData;
  update: (patch: Partial<BioglyphData>) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800">How do you feel about science class?</h2>
      <p className="mt-1 text-slate-500">Be honest — it decides your bioglyph&apos;s mouth.</p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {SCIENCE_FEELINGS.map((f) => (
          <OptionCard
            key={f.value}
            label={f.label}
            selected={data.scienceFeeling === f.value}
            onClick={() => update({ scienceFeeling: f.value })}
          >
            <span className="text-3xl">{f.icon}</span>
          </OptionCard>
        ))}
      </div>
    </div>
  );
}
