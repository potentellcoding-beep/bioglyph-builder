"use client";

import { HAIR_COLORS, HAIR_LENGTHS, MONTHS } from "@/lib/constants";
import { BioglyphData } from "@/lib/types";
import OptionCard from "../OptionCard";

export default function StepHair({
  data,
  update,
}: {
  data: BioglyphData;
  update: (patch: Partial<BioglyphData>) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800">Let&apos;s add some hair</h2>
      <p className="mt-1 text-slate-500">
        Your birth month decides how many hair strands you get (January = 1, December = 12).
      </p>

      <div className="mt-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Birth month
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {MONTHS.map((m, i) => (
            <OptionCard
              key={m}
              label={m}
              selected={data.birthMonth === i + 1}
              onClick={() => update({ birthMonth: i + 1 })}
              className="!p-2"
            >
              <span className="text-lg font-bold text-teal-600">{i + 1}</span>
            </OptionCard>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Hair color
        </label>
        <div className="flex flex-wrap gap-3">
          {HAIR_COLORS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => update({ hairColor: c.value })}
              aria-pressed={data.hairColor === c.value}
              title={c.label}
              className={`h-12 w-12 rounded-full border-4 transition-transform cursor-pointer ${
                data.hairColor === c.value
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
          Hair length
        </label>
        <div className="flex gap-3">
          {HAIR_LENGTHS.map((l) => (
            <OptionCard
              key={l.value}
              label={l.label}
              selected={data.hairLength === l.value}
              onClick={() => update({ hairLength: l.value })}
            >
              <span className="text-2xl">
                {l.value === "short" ? "✂️" : l.value === "medium" ? "💇" : "🎗️"}
              </span>
            </OptionCard>
          ))}
        </div>
      </div>
    </div>
  );
}
