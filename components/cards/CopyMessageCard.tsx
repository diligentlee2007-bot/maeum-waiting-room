"use client";

import { useState } from "react";

interface CopyMessageCardProps {
  title: string;
  text: string;
  footnote?: string; // 문장 아래 보조 안내
}

export default function CopyMessageCard({
  title,
  text,
  footnote,
}: CopyMessageCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 클립보드 권한이 없을 때를 위한 폴백
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* 복사 실패 시 사용자가 직접 선택할 수 있도록 둠 */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-3xl border border-ink-soft/15 bg-paper p-5 shadow-sm">
      <p className="text-sm font-medium text-ink-soft">{title}</p>
      <blockquote className="mt-2 text-lg leading-relaxed text-ink">
        “{text}”
      </blockquote>
      <button
        type="button"
        onClick={handleCopy}
        aria-live="polite"
        className="mt-4 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl border border-calm-deep/30 bg-calm/40 text-base text-ink transition-all duration-150 active:scale-[0.98] hover:bg-calm/60 focus:outline-none focus-visible:ring-4 focus-visible:ring-calm-deep/30"
      >
        {copied ? "✓ 복사했어요" : "문장 복사하기"}
      </button>
      {footnote && (
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{footnote}</p>
      )}
    </div>
  );
}
