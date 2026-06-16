// 상단 고정 응급 배너 — 모든 화면 위에 항상 노출
export default function EmergencyBanner() {
  return (
    <div className="sticky top-0 z-50 bg-urgent/90 backdrop-blur-sm text-white">
      <div className="mx-auto flex max-w-md items-center justify-center gap-2 px-4 py-2.5 text-center text-sm font-medium">
        <span aria-hidden="true">🚨</span>
        <span>
          지금 위험하다면{" "}
          <a href="tel:119" className="underline underline-offset-2 font-bold">
            119
          </a>{" "}
          또는{" "}
          <a href="tel:109" className="underline underline-offset-2 font-bold">
            109
          </a>
          로 연결하세요
        </span>
      </div>
    </div>
  );
}
