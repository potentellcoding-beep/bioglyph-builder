"use client";

import { EYEBROW_OPTIONS } from "@/lib/constants";
import { BioglyphData } from "@/lib/types";

export default function StepEyebrows({
  data,
  update,
}: {
  data: BioglyphData;
  update: (patch: Partial<BioglyphData>) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800">What&apos;s your favorite color?</h2>
      <p className="mt-1 text-slate-500">We&apos;ll use it for your eyebrows.</p>

      <div className="mt-6 flex flex-wrap gap-4">
        {EYEBROW_OPTIONS.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => update({ eyebrowColor: o.value })}
            aria-pressed={data.eyebrowColor === o.value}
            className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-2 cursor-pointer transition-transform ${
              data.eyebrowColor === o.value
                ? "border-teal-500 bg-teal-50 scale-105 shadow-md"
                : "border-slate-200 hover:scale-105"
            }`}
          >
            <span
              className="h-10 w-10 rounded-full border-2 border-white shadow ring-1 ring-slate-200"
              style={{ backgroundColor: o.color }}
            />
            <span className="text-xs font-medium text-slate-600">{o.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
