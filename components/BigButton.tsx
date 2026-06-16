import type { CardTone } from "@/lib/data";

const toneStyles: Record<CardTone, string> = {
  calm: "bg-calm/40 hover:bg-calm/60 border-calm-deep/30 text-ink",
  mint: "bg-mint/40 hover:bg-mint/60 border-mint-deep/30 text-ink",
  peach: "bg-peach/40 hover:bg-peach/60 border-peach-deep/30 text-ink",
  lavender:
    "bg-lavender/40 hover:bg-lavender/60 border-lavender-deep/30 text-ink",
  urgent:
    "bg-urgent/30 hover:bg-urgent/50 border-urgent-deep/40 text-ink font-semibold",
  neutral: "bg-paper hover:bg-cream border-ink-soft/15 text-ink-soft",
};

interface BigButtonProps {
  onClick?: () => void;
  href?: string; // tel: 또는 외부 링크
  external?: boolean; // 외부 링크면 새 탭으로 열기
  tone?: CardTone;
  title: string;
  subtitle?: string;
  className?: string;
  ariaLabel?: string;
}

export default function BigButton({
  onClick,
  href,
  external = false,
  tone = "neutral",
  title,
  subtitle,
  className = "",
  ariaLabel,
}: BigButtonProps) {
  const base =
    "block w-full min-h-[64px] rounded-3xl border px-5 py-4 text-left " +
    "shadow-sm transition-all duration-150 active:scale-[0.98] " +
    "focus:outline-none focus-visible:ring-4 focus-visible:ring-calm-deep/30";

  const content = (
    <span className="flex items-center justify-between gap-3">
      <span className="flex flex-col gap-0.5">
        <span className="text-lg leading-snug">{title}</span>
        {subtitle && <span className="text-sm text-ink-soft">{subtitle}</span>}
      </span>
      {external && (
        <span aria-hidden="true" className="shrink-0 text-ink-soft">
          ↗
        </span>
      )}
    </span>
  );

  const classes = `${base} ${toneStyles[tone]} ${className}`;

  if (href) {
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel ?? title}
        {...externalProps}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel ?? title}
    >
      {content}
    </button>
  );
}
