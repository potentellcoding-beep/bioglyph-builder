import { STEPS } from "@/lib/steps";

export default function ProgressBar({ currentIndex }: { currentIndex: number }) {
  const total = STEPS.length;
  const percent = ((currentIndex + 1) / total) * 100;

  return (
    <div>
      <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1.5">
        <span>
          Step {currentIndex + 1} of {total}
        </span>
        <span>{STEPS[currentIndex].title}</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
