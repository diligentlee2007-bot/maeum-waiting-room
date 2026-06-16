import type { Metadata, Viewport } from "next";
import "./globals.css";
import EmergencyBanner from "@/components/EmergencyBanner";

const SITE_URL = "https://maeum-waiting-room.vercel.app";
const TITLE = "마음대기실 — 1분 안에 도움 요청 문장 만들기";
const DESCRIPTION =
  "마음이 힘들 때, 도움을 청하는 한 문장을 1분 안에 만들고 공식 상담 기관으로 연결되도록 돕는 공익 웹사이트입니다. 전화가 어려우면 채팅·문자 상담도 안내해요.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "마음대기실",
  keywords: [
    "마음대기실",
    "마음 돌봄",
    "마음이 힘들 때",
    "도움 요청 문장",
    "상담 연결",
    "정신건강 도움",
  ],
  alternates: { canonical: "/" },
  verification: {
    google: "vVxSDMhle0gfWT7RRCEE_r3BTWcHk9Dq4RK8G5ilGK8",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "마음대기실",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf8f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="flex min-h-full flex-col">
        <EmergencyBanner />
        {children}
      </body>
    </html>
  );
}
