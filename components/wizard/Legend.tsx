import { buildLegend } from "@/lib/legend";
import { BioglyphData } from "@/lib/types";

export default function Legend({ data }: { data: BioglyphData }) {
  const rows = buildLegend(data);

  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 text-left text-slate-600">
            <th className="px-4 py-2.5 font-semibold">Feature</th>
            <th className="px-4 py-2.5 font-semibold">What it means</th>
            <th className="px-4 py-2.5 font-semibold">Your answer</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.feature} className="border-t border-slate-100">
              <td className="px-4 py-2.5 font-medium text-slate-800 whitespace-nowrap">
                {r.feature}
              </td>
              <td className="px-4 py-2.5 text-slate-500">{r.meaning}</td>
              <td className="px-4 py-2.5 text-teal-700 font-medium">{r.yourAnswer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
