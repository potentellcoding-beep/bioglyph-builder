"use client";

import { ICE_CREAM_FLAVORS } from "@/lib/constants";
import { BioglyphData } from "@/lib/types";
import OptionCard from "../OptionCard";

export default function StepCheeks({
  data,
  update,
}: {
  data: BioglyphData;
  update: (patch: Partial<BioglyphData>) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800">Favorite ice cream flavor?</h2>
      <p className="mt-1 text-slate-500">This one colors your cheeks.</p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {ICE_CREAM_FLAVORS.map((f) => (
          <OptionCard
            key={f.value}
            label={f.label}
            selected={data.iceCream === f.value}
            onClick={() => update({ iceCream: f.value })}
          >
            <span
              className="h-8 w-8 rounded-full border border-slate-300"
              style={{ backgroundColor: f.color }}
            />
          </OptionCard>
        ))}
      </div>
    </div>
  );
}
