import { chromium } from "playwright";

const OUT = "/tmp/maeum-shots";
const BASE = "http://localhost:3000";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();

async function go() {
  await page.goto(BASE, { waitUntil: "networkidle" });
}
async function shot(name, full = false) {
  await page.waitForTimeout(350);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: full });
  console.log("shot:", name);
}
async function pickFeeling(label) {
  await go();
  await page.getByRole("button", { name: new RegExp(label) }).first().click();
  await page.waitForTimeout(300);
}

// 1) 첫 화면 — 상태 선택
await go();
await shot("1-feelings");

// 2) ① 그냥 너무 힘들어요
await pickFeeling("그냥 너무 힘들어요");
await shot("2-hard", true);

// 3) ② 누군가에게 말하고 싶어요 (기본: 친구)
await pickFeeling("누군가에게 말하고 싶어요");
await shot("3-tell-friend", true);

// 3b) 멘토·선생님 토글로 문장이 바뀌는 모습
await page.getByRole("button", { name: "멘토·선생님" }).click();
await page.waitForTimeout(300);
await shot("3b-tell-mentor", true);

// 4) ③ 병원이나 상담을 알아보고 싶어요 (기관 카드 모음)
await pickFeeling("병원이나 상담을 알아보고 싶어요");
await shot("4-explore", true);

// 5) ④ 지금 혼자 있으면 위험할 것 같아요 (긴급)
await pickFeeling("지금 혼자 있으면 위험할 것 같아요");
await shot("5-danger", true);

await browser.close();
console.log("done");
