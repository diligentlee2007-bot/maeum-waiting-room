// 마음대기실 — 상태별 맞춤 흐름 데이터 + 문장 생성 로직
// 저장/전송/외부 API 없음. 모든 값은 클라이언트 메모리에서만 사용됩니다.

import { HOTLINES, LINKS, type ExternalLink, type Hotline } from "./resources";

export type ToneKey = "calm" | "mint" | "peach" | "lavender";
export type CardTone = ToneKey | "urgent" | "neutral";

// ── 카드 타입 ─────────────────────────────────────────────
export interface ReassuranceCard {
  type: "reassurance";
  title: string;
  body: string;
}

export interface GuidanceCard {
  type: "guidance";
  title: string;
  body: string;
}

export interface MessageCard {
  type: "message";
  title: string;
  text: string; // 복사될 문장
}

export interface PhoneCard {
  type: "phone";
  label: string;
  display: string;
  tel: string;
  desc: string;
  tone: CardTone;
  urgent?: boolean;
}

export interface ChatCard {
  type: "chat";
  label: string;
  url: string;
  desc: string;
  tone: CardTone;
}

export interface LinkCard {
  type: "link";
  label: string;
  url: string;
  desc: string;
  tone: CardTone;
}

export type Card =
  | ReassuranceCard
  | GuidanceCard
  | MessageCard
  | PhoneCard
  | ChatCard
  | LinkCard;

// 기관 상수 → 카드 변환 헬퍼
const phone = (h: Hotline, tone: CardTone, urgent = false): PhoneCard => ({
  type: "phone",
  label: h.label,
  display: h.display,
  tel: h.tel,
  desc: h.desc,
  tone,
  urgent,
});

const chat = (l: ExternalLink, tone: CardTone): ChatCard => ({
  type: "chat",
  label: l.label,
  url: l.url,
  desc: l.desc,
  tone,
});

const link = (l: ExternalLink, tone: CardTone): LinkCard => ({
  type: "link",
  label: l.label,
  url: l.url,
  desc: l.desc,
  tone,
});

// ── 받는 사람 (흐름 ②) ────────────────────────────────────
export interface Recipient {
  key: string;
  label: string;
}

export const RECIPIENTS: Recipient[] = [
  { key: "friend", label: "친구" },
  { key: "family", label: "가족" },
  { key: "mentor", label: "멘토·선생님" },
];

// 받는 사람별 도움 요청 문장 (순수 함수)
export function buildRecipientMessage(recipientKey: string): string {
  switch (recipientKey) {
    case "friend":
      return "요즘 마음이 많이 힘들어. 혼자 견디기가 버거워서 너한테 얘기하고 싶었어. 시간 괜찮을 때 잠깐 내 얘기 좀 들어줄 수 있을까?";
    case "family":
      return "요즘 마음이 많이 힘들어요. 혼자 감당하기가 버거워서 이야기를 나누고 싶어요. 잠깐 시간 내서 제 얘기를 들어주실 수 있을까요?";
    case "mentor":
      return "요즘 마음이 많이 힘듭니다. 혼자 견디기가 어려워 조심스럽게 말씀드려요. 잠깐 시간을 내어 제 이야기를 들어주실 수 있을까요?";
    default:
      return "";
  }
}

// ── 상태별 흐름 설정 ──────────────────────────────────────
export interface Feeling {
  key: string;
  label: string; // 1화면 버튼 제목
  hint: string; // 1화면 버튼 보조 문구
  tone: CardTone;
  heading: string; // 2화면 제목
  comfort: string; // 2화면 위로 문구
  cards: Card[];
  compactCards?: boolean; // 카드가 많을 때 간격을 좁힘 (흐름 ③)
  recipients?: Recipient[]; // 있으면 받는사람 선택 + 동적 문장 노출 (흐름 ②)
  recipientMessageTitle?: string;
  recipientGuidance?: string; // 동적 문장 아래 보조 안내
}

export const FEELINGS: Feeling[] = [
  // ① 그냥 너무 힘들어요
  {
    key: "hard",
    label: "그냥 너무 힘들어요",
    hint: "특별한 이유를 설명하지 않아도 괜찮아요",
    tone: "calm",
    heading: "지금 그 마음, 그대로 괜찮아요",
    comfort:
      "이유를 또렷이 설명하지 못해도 돼요. 여기까지 온 것만으로 충분히 잘하고 있어요.",
    cards: [
      {
        type: "reassurance",
        title: "‘이 정도로 도움받아도 될까’ 망설여진다면",
        body: "도움을 청하는 데 충분한 이유 같은 건 필요하지 않아요. 지금 힘든 그 마음이면 충분합니다. 망설임 때문에 혼자 버티지 않아도 괜찮아요.",
      },
      {
        type: "message",
        title: "복사해서 어디든 보낼 수 있는 문장",
        text: "요즘 마음이 많이 지치고 힘들어요. 혼자 견디기가 버거워서, 잠깐 이야기를 나눌 수 있을지 조심스럽게 여쭤봐요.",
      },
      chat(LINKS.madeullan, "mint"),
      phone(HOTLINES.suicide109, "calm"),
    ],
  },

  // ② 누군가에게 말하고 싶어요
  {
    key: "tell",
    label: "누군가에게 말하고 싶어요",
    hint: "친구·가족·멘토에게 마음을 전해보기",
    tone: "mint",
    heading: "마음을 전할 한 문장을 만들어 드릴게요",
    comfort: "누구에게 보낼지 고르면, 그 사람에게 맞는 문장으로 바뀌어요.",
    recipients: RECIPIENTS,
    recipientMessageTitle: "복사해서 보내보세요",
    recipientGuidance:
      "이 문장과 함께 “무슨 말을 해줘야 할지 몰라도 괜찮아. 그냥 들어주고 ‘말해줘서 고마워’라고만 답해줘”라고 덧붙이면, 상대도 한결 편하게 응답할 수 있어요.",
    cards: [
      {
        type: "guidance",
        title: "내 이야기를 들은 사람에게 바라는 것",
        body: "조언이나 해결책이 아니어도 돼요. 옆에서 들어주고, 평가하지 않고, “함께 있을게”라고 말해주는 것만으로 큰 힘이 됩니다.",
      },
    ],
  },

  // ③ 병원이나 상담을 알아보고 싶어요
  {
    key: "explore",
    label: "병원이나 상담을 알아보고 싶어요",
    hint: "전화·채팅·기관 정보 천천히 둘러보기",
    tone: "lavender",
    heading: "함께 알아볼 수 있는 곳들이에요",
    comfort: "지금 바로 연결하지 않아도 괜찮아요. 천천히 둘러보세요.",
    compactCards: true,
    cards: [
      phone(HOTLINES.suicide109, "calm"),
      phone(HOTLINES.crisis1577, "lavender"),
      chat(LINKS.madeullan, "mint"),
      phone(HOTLINES.youth1388, "mint"),
      chat(LINKS.youthChat, "calm"),
      phone(HOTLINES.lifeline, "peach"),
      link(LINKS.selfCheck, "peach"),
      link(LINKS.centerFinder, "lavender"),
    ],
  },

  // ④ 지금 혼자 있으면 위험할 것 같아요
  {
    key: "danger",
    label: "지금 혼자 있으면 위험할 것 같아요",
    hint: "지금 바로 연결이 필요해요",
    tone: "urgent",
    heading: "지금 곁에 도움이 닿게 할게요",
    comfort: "혼자 두지 않을게요. 아래에서 지금 바로 연결할 수 있어요.",
    cards: [
      phone(HOTLINES.emergency119, "urgent", true),
      phone(HOTLINES.suicide109, "calm"),
      {
        type: "message",
        title: "지금 곁에 있어줄 사람에게 보낼 문장",
        text: "지금 혼자 있는 게 무섭고 많이 힘들어. 잠깐이라도 곁에 있어주거나 통화해줄 수 있을까? 네가 있어주면 큰 도움이 될 것 같아.",
      },
      chat(LINKS.madeullan, "mint"),
    ],
  },
];
