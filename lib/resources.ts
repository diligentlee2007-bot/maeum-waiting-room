// 공식 도움 기관 — 전화번호 / 외부 링크를 한곳에서 관리합니다.
// ⚠️ 배포 전 각 번호·URL의 현행 운영 여부를 공식 출처로 다시 확인하는 것을 권장합니다.

export interface Hotline {
  label: string;
  display: string; // 화면 표기 (예: 1577-0199)
  tel: string; // tel: 링크용 숫자
  desc: string;
}

export interface ExternalLink {
  label: string;
  url: string;
  desc: string;
}

export const HOTLINES = {
  suicide109: {
    label: "자살예방 상담전화",
    display: "109",
    tel: "109",
    desc: "24시간 · 전문 상담원 연결",
  },
  crisis1577: {
    label: "정신건강 위기상담전화",
    display: "1577-0199",
    tel: "15770199",
    desc: "24시간 · 정신건강 위기 상담",
  },
  youth1388: {
    label: "청소년 상담전화",
    display: "1388",
    tel: "1388",
    desc: "9~24세 · 365일 24시간",
  },
  lifeline: {
    label: "생명의전화",
    display: "1588-9191",
    tel: "15889191",
    desc: "24시간 · 위기 상담",
  },
  emergency119: {
    label: "긴급 구조",
    display: "119",
    tel: "119",
    desc: "생명이 위급할 때 즉시 연결",
  },
} satisfies Record<string, Hotline>;

export const LINKS = {
  madeullan: {
    label: "마들랜 자살예방 SNS 상담",
    url: "https://www.129.go.kr/etc/madlan",
    desc: "문자·카카오톡·앱 채팅 상담 (24시간)",
  },
  youthChat: {
    label: "청소년 1388 채팅상담",
    url: "https://www.1388.go.kr/",
    desc: "웹·문자·카카오톡 1:1 실시간 채팅",
  },
  selfCheck: {
    label: "국가정신건강정보포털 자가검진",
    url: "https://www.mentalhealth.go.kr/portal/mdexmnDtl/mdexmnTypeList.do",
    desc: "공식 자가검진 페이지로 이동",
  },
  centerFinder: {
    label: "정신건강복지센터 찾기",
    url: "https://www.mentalhealth.go.kr/portal/health/fac/PotalHealthFacListTab1.do?tab1no=tab1no1",
    desc: "내 주변 정신건강복지센터·기관 검색",
  },
} satisfies Record<string, ExternalLink>;
