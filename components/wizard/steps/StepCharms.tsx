"use client";

import { ACTIVITY_OPTIONS, CHARM_SHAPE_LABEL } from "@/lib/constants";
import { BioglyphData, CharmShape } from "@/lib/types";
import OptionCard from "../OptionCard";
import { starPoints } from "@/lib/svgShapes";

function ShapeIcon({ shape }: { shape: CharmShape }) {
  const c = 18;
  const r = 14;

  return (
    <svg viewBox="0 0 36 36" className="h-8 w-8">
      {shape === "circle" && (
        <circle cx={c} cy={c} r={11} fill="#f2c14e" stroke="#3a2a1c" strokeWidth={2} />
      )}
      {shape === "rectangle" && (
        <rect
          x={c - r}
          y={c - r * 0.65}
          width={r * 2}
          height={r * 1.3}
          fill="#f2c14e"
          stroke="#3a2a1c"
          strokeWidth={2}
        />
      )}
      {shape === "star" && (
        <polygon
          points={starPoints(c, c, 14, 6)}
          fill="#f2c14e"
          stroke="#3a2a1c"
          strokeWidth={2}
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default function StepCharms({
  data,
  update,
}: {
  data: BioglyphData;
  update: (patch: Partial<BioglyphData>) => void;
}) {
  const noneSelected = data.activities.length === 0;

  function toggle(id: string) {
    const has = data.activities.includes(id);
    update({
      activities: has
        ? data.activities.filter((a) => a !== id)
        : [...data.activities, id],
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800">
        What sports, clubs, or groups are you in?
      </h2>
      <p className="mt-1 text-slate-500">
        Pick as many as apply — each one adds a charm below your bioglyph&apos;s chin.
      </p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {ACTIVITY_OPTIONS.map((a) => (
          <OptionCard
            key={a.id}
            label={a.label}
            selected={data.activities.includes(a.id)}
            onClick={() => toggle(a.id)}
          >
            <ShapeIcon shape={a.shape} />
          </OptionCard>
        ))}
        <OptionCard
          label="I do not participate in any activities"
          selected={noneSelected}
          onClick={() => update({ activities: [] })}
          className="col-span-2 sm:col-span-3"
        >
          <span className="text-2xl">🚫</span>
        </OptionCard>
      </div>
      <p className="mt-4 text-xs text-slate-400">
        Shape key: {Object.entries(CHARM_SHAPE_LABEL).map(([, v]) => v).join(", ")}
      </p>
    </div>
  );
}
