import { FEELINGS, type Feeling } from "@/lib/data";
import BigButton from "./BigButton";

interface StepFeelingProps {
  onSelect: (feeling: Feeling) => void;
}

export default function StepFeeling({ onSelect }: StepFeelingProps) {
  return (
    <section className="flex flex-col gap-6">
      <header className="text-center">
        <h1 className="text-2xl font-bold text-ink">지금 마음이 어떤가요?</h1>
        <p className="mt-2 text-ink-soft">
          가장 가까운 마음을 하나 골라 주세요. 고른 마음에 맞게 도와드릴게요.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {FEELINGS.map((feeling) => (
          <BigButton
            key={feeling.key}
            tone={feeling.tone}
            title={feeling.label}
            subtitle={feeling.hint}
            onClick={() => onSelect(feeling)}
          />
        ))}
      </div>
    </section>
  );
}
