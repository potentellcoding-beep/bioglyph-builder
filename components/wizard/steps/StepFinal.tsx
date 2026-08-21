"use client";

import { useRef } from "react";
import BioglyphSVG from "@/components/bioglyph/BioglyphSVG";
import Legend from "../Legend";
import { BioglyphData } from "@/lib/types";
import { downloadSvgAsPng } from "@/lib/exportSvg";

export default function StepFinal({
  data,
  update,
}: {
  data: BioglyphData;
  update: (patch: Partial<BioglyphData>) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  function handleSave() {
    if (!svgRef.current) return;
    const name = data.studentName.trim() || "my";
    downloadSvgAsPng(svgRef.current, `${name}-bioglyph.png`);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800">Your bioglyph is complete! 🎉</h2>
      <p className="mt-1 text-slate-500">
        Save it, print it, or just look closely — then head to class and recreate it{" "}
        <strong>by hand, on paper</strong>. Your teacher will use it for the classmate-guessing
        game, so keep your paper drawing accurate to what you see here.
      </p>

      <div className="mt-4 max-w-xs">
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Your name (for your own reference — not shown on the bioglyph)
        </label>
        <input
          type="text"
          value={data.studentName}
          onChange={(e) => update({ studentName: e.target.value })}
          placeholder="Optional"
          className="w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-slate-700 focus:border-teal-500 focus:outline-none"
        />
      </div>

      <div className="mt-6 grid lg:grid-cols-[minmax(0,320px)_1fr] gap-8">
        <div className="print-area rounded-3xl border-2 border-slate-200 bg-gradient-to-b from-sky-50 to-white p-4">
          <BioglyphSVG ref={svgRef} data={data} className="w-full h-auto" />
        </div>

        <div>
          <div className="flex flex-wrap gap-3 mb-4 no-print">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-xl bg-teal-600 px-5 py-2.5 font-semibold text-white shadow hover:bg-teal-700 cursor-pointer"
            >
              Save as image
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="rounded-xl border-2 border-teal-600 px-5 py-2.5 font-semibold text-teal-700 hover:bg-teal-50 cursor-pointer"
            >
              Print
            </button>
          </div>

          <h3 className="text-sm font-semibold text-slate-700 mb-2">
            Legend — what each feature means
          </h3>
          <Legend data={data} />
        </div>
      </div>
    </div>
  );
}
