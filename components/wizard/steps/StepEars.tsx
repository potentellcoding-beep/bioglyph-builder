"use client";

import { BioglyphData, SiblingCounts } from "@/lib/types";

const FIELDS: { key: keyof SiblingCounts; label: string; hint: string }[] = [
  { key: "olderSisters", label: "Older sisters", hint: "left ear, upper dots" },
  { key: "youngerSisters", label: "Younger sisters", hint: "left ear, lower dots" },
  { key: "olderBrothers", label: "Older brothers", hint: "right ear, upper dots" },
  { key: "youngerBrothers", label: "Younger brothers", hint: "right ear, lower dots" },
];

export default function StepEars({
  data,
  update,
}: {
  data: BioglyphData;
  update: (patch: Partial<BioglyphData>) => void;
}) {
  function setCount(key: keyof SiblingCounts, value: number) {
    const next = Math.max(0, Math.min(9, value));
    update({ siblings: { ...data.siblings, [key]: next } });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800">Tell us about your siblings</h2>
      <p className="mt-1 text-slate-500">
        Sisters show up as dots on the left ear, brothers on the right. Older siblings sit
        higher on the ear, younger siblings sit lower.
      </p>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {FIELDS.map((f) => (
          <div key={f.key} className="rounded-2xl border-2 border-slate-200 bg-white p-4">
            <div className="text-sm font-semibold text-slate-700">{f.label}</div>
            <div className="text-xs text-slate-400 mb-3">{f.hint}</div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setCount(f.key, data.siblings[f.key] - 1)}
                className="h-9 w-9 rounded-full bg-slate-100 text-slate-700 font-bold text-lg hover:bg-slate-200 cursor-pointer"
                aria-label={`decrease ${f.label}`}
              >
                −
              </button>
              <span className="w-6 text-center text-xl font-bold text-teal-600">
                {data.siblings[f.key]}
              </span>
              <button
                type="button"
                onClick={() => setCount(f.key, data.siblings[f.key] + 1)}
                className="h-9 w-9 rounded-full bg-slate-100 text-slate-700 font-bold text-lg hover:bg-slate-200 cursor-pointer"
                aria-label={`increase ${f.label}`}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-400">No siblings? Leave everything at 0 and move on.</p>
    </div>
  );
}
