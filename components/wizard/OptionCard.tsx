"use client";

export default function OptionCard({
  selected,
  onClick,
  label,
  children,
  className = "",
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group flex flex-col items-center gap-2 rounded-2xl border-2 p-3 transition-all cursor-pointer
        ${selected
          ? "border-teal-500 bg-teal-50 shadow-md ring-2 ring-teal-200"
          : "border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50/40"
        } ${className}`}
    >
      {children}
      <span
        className={`text-sm font-medium ${selected ? "text-teal-700" : "text-slate-600"}`}
      >
        {label}
      </span>
    </button>
  );
}
