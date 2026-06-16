interface ProgressDotsProps {
  current: 1 | 2;
}

export default function ProgressDots({ current }: ProgressDotsProps) {
  return (
    <div
      className="flex items-center justify-center gap-2"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={2}
      aria-valuenow={current}
      aria-label={`전체 2단계 중 ${current}단계`}
    >
      {[1, 2].map((n) => (
        <span
          key={n}
          className={`h-2 rounded-full transition-all duration-200 ${
            n === current
              ? "w-6 bg-calm-deep"
              : n < current
                ? "w-2 bg-calm-deep/50"
                : "w-2 bg-ink-soft/20"
          }`}
        />
      ))}
    </div>
  );
}
