import type { Card } from "@/lib/data";
import BigButton from "../BigButton";
import CopyMessageCard from "./CopyMessageCard";

// 텍스트 전용 정보 카드 (reassurance / guidance 공용)
function InfoCard({
  title,
  body,
  accent,
}: {
  title: string;
  body: string;
  accent: "calm" | "mint";
}) {
  const styles =
    accent === "calm"
      ? "border-calm-deep/25 bg-calm/15"
      : "border-mint-deep/25 bg-mint/15";
  return (
    <div className={`rounded-3xl border ${styles} px-5 py-4`}>
      <p className="font-semibold text-ink">{title}</p>
      <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}

export default function ResourceCard({ card }: { card: Card }) {
  switch (card.type) {
    case "reassurance":
      return <InfoCard title={card.title} body={card.body} accent="calm" />;

    case "guidance":
      return <InfoCard title={card.title} body={card.body} accent="mint" />;

    case "message":
      return <CopyMessageCard title={card.title} text={card.text} />;

    case "phone":
      return (
        <BigButton
          href={`tel:${card.tel}`}
          tone={card.tone}
          title={`${card.label} (${card.display})`}
          subtitle={card.desc}
          ariaLabel={`${card.label} ${card.display}로 전화 걸기`}
        />
      );

    case "chat":
    case "link":
      return (
        <BigButton
          href={card.url}
          external
          tone={card.tone}
          title={card.label}
          subtitle={card.desc}
          ariaLabel={`${card.label} — 새 탭으로 열기`}
        />
      );
  }
}
