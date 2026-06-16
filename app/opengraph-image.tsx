import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "마음대기실 — 1분 안에 도움 요청 문장 만들기";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontPath = (file: string) =>
  join(process.cwd(), "app", "og-assets", file);

export default async function OpengraphImage() {
  const [bold, regular] = await Promise.all([
    readFile(fontPath("Pretendard-Bold.subset.otf")),
    readFile(fontPath("Pretendard-Regular.subset.otf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FBF8F3",
          padding: "80px 90px",
          fontFamily: "Pretendard",
        }}
      >
        {/* 상단 라벨 */}
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              color: "#6F9BB3",
              backgroundColor: "#A8C7D9",
              opacity: 0.95,
              padding: "14px 30px",
              borderRadius: 999,
              fontWeight: 600,
            }}
          >
            마음이 힘들 때
          </div>
        </div>

        {/* 중앙 제목 + 안내 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 130,
              fontWeight: 700,
              color: "#3D3A36",
              letterSpacing: -2,
            }}
          >
            마음대기실
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 50,
              color: "#6B665F",
              fontWeight: 400,
            }}
          >
            1분 안에 도움 요청 문장 만들기
          </div>
        </div>

        {/* 하단 긴급 안내 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 38,
            color: "#D2705C",
            fontWeight: 600,
          }}
        >
          지금 위험하다면 119 · 109 즉시 연결
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Pretendard", data: bold, weight: 700, style: "normal" },
        { name: "Pretendard", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
