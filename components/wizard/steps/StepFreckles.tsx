"use client";

import { BioglyphData } from "@/lib/types";
import OptionCard from "../OptionCard";

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export default function StepFreckles({
  data,
  update,
}: {
  data: BioglyphData;
  update: (patch: Partial<BioglyphData>) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800">What day of the month were you born?</h2>
      <p className="mt-1 text-slate-500">
        That number becomes your freckle count — born on the 26th means 26 freckles.
      </p>

      <div className="mt-6">
        <select
          value={data.birthDay ?? ""}
          onChange={(e) => update({ birthDay: e.target.value ? Number(e.target.value) : null })}
          className="w-40 rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-lg font-semibold text-slate-700 focus:border-teal-500 focus:outline-none cursor-pointer"
        >
          <option value="" disabled>
            Day
          </option>
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Freckle placement
        </label>
        <div className="flex gap-3">
          <OptionCard
            label="Split both cheeks"
            selected={data.freckleSplit === "split"}
            onClick={() => update({ freckleSplit: "split" })}
          >
            <span className="text-2xl">🙂</span>
          </OptionCard>
          <OptionCard
            label="Single cheek"
            selected={data.freckleSplit === "single"}
            onClick={() => update({ freckleSplit: "single" })}
          >
            <span className="text-2xl">😊</span>
          </OptionCard>
        </div>
      </div>
    </div>
  );
}
