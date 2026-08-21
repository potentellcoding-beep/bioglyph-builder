"use client";

import { EYE_COLORS } from "@/lib/constants";
import { BioglyphData } from "@/lib/types";
import OptionCard from "../OptionCard";

export default function StepEyes({
  data,
  update,
}: {
  data: BioglyphData;
  update: (patch: Partial<BioglyphData>) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800">What are your eyes like?</h2>
      <p className="mt-1 text-slate-500">Pick your eye color, then tell us about your vision.</p>

      <div className="mt-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Eye color</label>
        <div className="flex flex-wrap gap-3">
          {EYE_COLORS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => update({ eyeColor: c.value })}
              aria-pressed={data.eyeColor === c.value}
              title={c.label}
              className={`h-12 w-12 rounded-full border-4 transition-transform cursor-pointer ${
                data.eyeColor === c.value
                  ? "border-teal-500 scale-110 shadow-md"
                  : "border-white shadow ring-1 ring-slate-200 hover:scale-105"
              }`}
              style={{ backgroundColor: c.value }}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Do you wear glasses or contacts?
        </label>
        <div className="flex gap-3">
          <OptionCard
            label="Glasses / contacts"
            selected={data.eyeStyle === "oval"}
            onClick={() => update({ eyeStyle: "oval" })}
          >
            <span className="text-2xl">👓</span>
          </OptionCard>
          <OptionCard
            label="Perfect vision"
            selected={data.eyeStyle === "circle"}
            onClick={() => update({ eyeStyle: "circle" })}
          >
            <span className="text-2xl">👁️</span>
          </OptionCard>
        </div>
      </div>
    </div>
  );
}
