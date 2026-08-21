"use client";

import { BioglyphData } from "@/lib/types";
import OptionCard from "../OptionCard";

export default function StepEyelashes({
  data,
  update,
}: {
  data: BioglyphData;
  update: (patch: Partial<BioglyphData>) => void;
}) {
  const count = data.petTypeCount ?? 0;
  const noPets = count === 0;

  function setCount(value: number) {
    update({ petTypeCount: Math.max(1, Math.min(12, value)) });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800">
        How many different types of pets do you have?
      </h2>
      <p className="mt-1 text-slate-500">
        Count pet types, not individual pets — two dogs and a cat is 2 types. This sets your
        eyelash count.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 max-w-sm">
        <OptionCard
          label="I do not have any pets"
          selected={noPets}
          onClick={() => update({ petTypeCount: 0 })}
        >
          <span className="text-2xl">🚫</span>
        </OptionCard>
        <OptionCard
          label="I have pets"
          selected={!noPets}
          onClick={() => setCount(Math.max(1, count))}
        >
          <span className="text-2xl">🐾</span>
        </OptionCard>
      </div>

      {!noPets && (
        <div className="mt-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setCount(count - 1)}
            className="h-11 w-11 rounded-full bg-slate-100 text-slate-700 font-bold text-xl hover:bg-slate-200 cursor-pointer"
            aria-label="decrease pet types"
          >
            −
          </button>
          <span className="w-10 text-center text-2xl font-bold text-teal-600">{count}</span>
          <button
            type="button"
            onClick={() => setCount(count + 1)}
            className="h-11 w-11 rounded-full bg-slate-100 text-slate-700 font-bold text-xl hover:bg-slate-200 cursor-pointer"
            aria-label="increase pet types"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
