"use client";

import { useState } from "react";
import {
  buildRecipientMessage,
  type Feeling,
} from "@/lib/data";
import ResourceCard from "./cards/ResourceCard";
import CopyMessageCard from "./cards/CopyMessageCard";

interface StepResultProps {
  feeling: Feeling;
  onBack: () => void;
  onRestart: () => void;
}

export default function StepResult({
  feeling,
  onBack,
  onRestart,
}: StepResultProps) {
  const recipients = feeling.recipients;
  const [recipientKey, setRecipientKey] = useState(
    recipients ? recipients[0].key : "",
  );

  return (
    <section className="flex flex-col gap-6">
      <header className="text-center">
        <h1 className="text-2xl font-bold text-ink">{feeling.heading}</h1>
        <p className="mt-2 text-ink-soft">{feeling.comfort}</p>
      </header>

      {/* 흐름 ②: 받는 사람 선택 + 동적 문장 */}
      {recipients && (
        <div className="flex flex-col gap-3">
          <div
            className="flex gap-2 rounded-full bg-cream p-1"
            role="group"
            aria-label="받는 사람 선택"
          >
            {recipients.map((r) => {
              const active = r.key === recipientKey;
              return (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setRecipientKey(r.key)}
                  aria-pressed={active}
                  className={`flex-1 rounded-full py-2.5 text-[15px] transition-colors ${
                    active
                      ? "bg-paper font-semibold text-ink shadow-sm"
                      : "text-ink-soft"
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>

          <CopyMessageCard
            key={recipientKey}
            title={feeling.recipientMessageTitle ?? "복사해서 보내보세요"}
            text={buildRecipientMessage(recipientKey)}
            footnote={feeling.recipientGuidance}
          />
        </div>
      )}

      {/* 상태별 카드 목록 */}
      <div className={`flex flex-col ${feeling.compactCards ? "gap-2" : "gap-3"}`}>
        {feeling.cards.map((card, i) => (
          <ResourceCard key={`${card.type}-${i}`} card={card} />
        ))}
      </div>

      {/* 보조 내비게이션 */}
      <div className="flex items-center justify-between pt-1 text-sm text-ink-soft">
        <button
          type="button"
          onClick={onBack}
          className="underline underline-offset-4"
        >
          ← 다른 마음 고르기
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="underline underline-offset-4"
        >
          처음으로
        </button>
      </div>
    </section>
  );
}
