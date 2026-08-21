export default function WizardNav({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
  isFinal,
}: {
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  isFinal: boolean;
}) {
  return (
    <div className="mt-8 flex items-center justify-between no-print">
      <button
        type="button"
        onClick={onBack}
        disabled={!canGoBack}
        className="rounded-xl px-5 py-2.5 font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
      >
        ← Back
      </button>
      {!isFinal && (
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className="rounded-xl bg-teal-600 px-6 py-2.5 font-semibold text-white shadow hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none cursor-pointer"
        >
          Next →
        </button>
      )}
    </div>
  );
}
