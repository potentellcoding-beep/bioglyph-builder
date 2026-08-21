"use client";

import { TRANSPORT_OPTIONS } from "@/lib/constants";
import { BioglyphData } from "@/lib/types";
import OptionCard from "../OptionCard";

export default function StepNose({
  data,
  update,
}: {
  data: BioglyphData;
  update: (patch: Partial<BioglyphData>) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800">How do you get to school?</h2>
      <p className="mt-1 text-slate-500">Most days — pick the one you use most. This shapes your nose.</p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {TRANSPORT_OPTIONS.map((t) => (
          <OptionCard
            key={t.value}
            label={t.label}
            selected={data.transport === t.value}
            onClick={() => update({ transport: t.value })}
          >
            <span className="text-3xl">{t.icon}</span>
          </OptionCard>
        ))}
      </div>
    </div>
  );
}
