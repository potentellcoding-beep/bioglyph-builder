"use client";

import { useMemo, useState } from "react";
import BioglyphSVG from "@/components/bioglyph/BioglyphSVG";
import ProgressBar from "@/components/wizard/ProgressBar";
import WizardNav from "@/components/wizard/WizardNav";
import StepFaceShape from "@/components/wizard/steps/StepFaceShape";
import StepHair from "@/components/wizard/steps/StepHair";
import StepEyes from "@/components/wizard/steps/StepEyes";
import StepEyebrows from "@/components/wizard/steps/StepEyebrows";
import StepNose from "@/components/wizard/steps/StepNose";
import StepCharms from "@/components/wizard/steps/StepCharms";
import StepEars from "@/components/wizard/steps/StepEars";
import StepMouth from "@/components/wizard/steps/StepMouth";
import StepCheeks from "@/components/wizard/steps/StepCheeks";
import StepFreckles from "@/components/wizard/steps/StepFreckles";
import StepEyelashes from "@/components/wizard/steps/StepEyelashes";
import StepFinal from "@/components/wizard/steps/StepFinal";
import { STEPS } from "@/lib/steps";
import { BioglyphData, initialBioglyphData } from "@/lib/types";

const STEP_COMPONENTS = [
  StepFaceShape,
  StepHair,
  StepEyes,
  StepEyebrows,
  StepNose,
  StepCharms,
  StepEars,
  StepMouth,
  StepCheeks,
  StepFreckles,
  StepEyelashes,
  StepFinal,
];

export default function Home() {
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<BioglyphData>(initialBioglyphData);

  const update = (patch: Partial<BioglyphData>) => setData((d) => ({ ...d, ...patch }));

  const isFinal = stepIndex === STEPS.length - 1;
  const canGoNext = useMemo(() => STEPS[stepIndex].isValid(data), [stepIndex, data]);
  const StepComponent = STEP_COMPONENTS[stepIndex];

  function goNext() {
    if (canGoNext) setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }
  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur no-print">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center gap-3">
          <span className="text-2xl">🧬</span>
          <div>
            <h1 className="text-lg font-bold text-slate-800 leading-tight">Bioglyph Builder</h1>
            <p className="text-xs text-slate-400 leading-tight">
              Build your personal bioglyph, one question at a time
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <div className="mb-6 no-print">
          <ProgressBar currentIndex={stepIndex} />
        </div>

        {isFinal ? (
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-slate-100">
            <StepComponent data={data} update={update} />
            <WizardNav
              onBack={goBack}
              onNext={goNext}
              canGoBack={stepIndex > 0}
              canGoNext={canGoNext}
              isFinal={isFinal}
            />
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-slate-100 order-2 lg:order-1">
              <StepComponent data={data} update={update} />
              <WizardNav
                onBack={goBack}
                onNext={goNext}
                canGoBack={stepIndex > 0}
                canGoNext={canGoNext}
                isFinal={isFinal}
              />
            </div>

            <div className="order-1 lg:order-2 lg:sticky lg:top-6">
              <div className="rounded-3xl border-2 border-slate-200 bg-gradient-to-b from-sky-50 to-white p-4 sm:p-6">
                <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Live preview
                </p>
                <BioglyphSVG
                  data={data}
                  revealUpTo={stepIndex}
                  className="mx-auto w-full max-w-xs h-auto"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
