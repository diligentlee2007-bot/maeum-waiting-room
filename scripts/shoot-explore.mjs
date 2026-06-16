import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page
  .getByRole("button", { name: /병원이나 상담을 알아보고 싶어요/ })
  .first()
  .click();
await page.waitForTimeout(500);
await page.screenshot({ path: "/tmp/maeum-shots/4-explore.png", fullPage: true });
await browser.close();
console.log("done");
