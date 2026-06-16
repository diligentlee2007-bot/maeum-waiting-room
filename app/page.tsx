"use client";

import { useState } from "react";
import type { Feeling } from "@/lib/data";
import ProgressDots from "@/components/ProgressDots";
import StepFeeling from "@/components/StepFeeling";
import StepResult from "@/components/StepResult";

export default function Home() {
  const [step, setStep] = useState<1 | 2>(1);
  const [feeling, setFeeling] = useState<Feeling | null>(null);

  function selectFeeling(f: Feeling) {
    setFeeling(f);
    setStep(2);
  }

  function restart() {
    setFeeling(null);
    setStep(1);
  }

  return (
    <main className="mx-auto flex min-h-[calc(100dvh-44px)] w-full max-w-md flex-col px-5 pb-12 pt-6">
      <div className="mb-8">
        <ProgressDots current={step} />
      </div>

      {step === 1 && <StepFeeling onSelect={selectFeeling} />}

      {step === 2 && feeling && (
        <StepResult
          feeling={feeling}
          onBack={() => setStep(1)}
          onRestart={restart}
        />
      )}

      <footer className="mt-auto pt-10 text-center text-xs leading-relaxed text-ink-soft/70">
        마음대기실은 전문 상담·진단·치료를 대신하지 않으며, 도움을 청하는 첫
        걸음을 돕습니다. 어떤 정보도 저장하거나 전송하지 않아요.
      </footer>
    </main>
  );
}
