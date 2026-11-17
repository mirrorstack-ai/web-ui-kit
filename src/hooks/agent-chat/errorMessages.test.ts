import { describe, expect, it } from "vitest";
import {
  AGENT_ERROR_COPY,
  KNOWN_AGENT_CODES,
  agentErrorMessage,
  clampRetryAfterSeconds,
} from "./errorMessages";

const NEW_CODES = {
  prompt_too_long: {
    en: "Your message is too long. Please shorten it and try again.",
    "zh-TW": "訊息太長，請縮短後再試一次。",
  },
  ai_unavailable: {
    en: "The AI assistant is unavailable right now. Please try again later.",
    "zh-TW": "AI 助理目前無法使用，請稍後再試。",
  },
  ai_credits_exhausted: {
    en: "Your AI credits have run out.",
    "zh-TW": "你的 AI 額度已用完。",
  },
  ask_unlinked: {
    en: "This question can't be answered any more. Please ask again.",
    "zh-TW": "這個問題已無法回答，請重新提問。",
  },
} as const;

describe("agentErrorMessage", () => {
  for (const [code, text] of Object.entries(NEW_CODES)) {
    for (const locale of ["en", "zh-TW"] as const) {
      it(`${code} has its own ${locale} text, not the generic line`, () => {
        expect(agentErrorMessage(code, locale)).toBe(text[locale]);
        expect(agentErrorMessage(code, locale)).not.toBe(AGENT_ERROR_COPY[locale].fallback);
      });
    }
  }

  it("every locale carries every known agent code", () => {
    for (const copy of Object.values(AGENT_ERROR_COPY)) {
      for (const code of KNOWN_AGENT_CODES) expect(copy.messages[code]).toBeTruthy();
    }
  });

  it("gives per-locale copy for a known code", () => {
    expect(agentErrorMessage("agent_turn_limit", "en")).toBe(
      "You have reached the message limit for now.",
    );
    expect(agentErrorMessage("agent_turn_limit", "zh-TW")).toBe("你暫時已達訊息數量上限。");
  });

  it("appends the wait in the reader's locale", () => {
    expect(agentErrorMessage("agent_turn_limit", "en", 42)).toBe(
      "You have reached the message limit for now. Try again in 42 seconds.",
    );
    expect(agentErrorMessage("agent_turn_limit", "en", 1)).toContain("1 second.");
    expect(agentErrorMessage("agent_turn_limit", "en", 90)).toContain("2 minutes");
    expect(agentErrorMessage("agent_turn_limit", "zh-TW", 42)).toBe(
      "你暫時已達訊息數量上限。請於 42 秒後再試。",
    );
    expect(agentErrorMessage("daily_ai_ceiling", "zh-TW", 7200)).toContain("2 小時");
  });

  it("falls back: unknown code → generic, language prefix → zh-TW, unknown locale → English", () => {
    expect(agentErrorMessage("brand_new_code", "en")).toBe("Something went wrong. Please try again.");
    expect(agentErrorMessage("send_failed", "zh")).toBe("訊息無法送出，請再試一次。");
    expect(agentErrorMessage("send_failed", "fr")).toBe("Your message could not be sent. Please try again.");
  });

  it("states no wait for a bad value", () => {
    expect(agentErrorMessage("agent_turn_limit", "en", Number.NaN)).not.toContain("Try again in");
    expect(agentErrorMessage("agent_turn_limit", "en", -3)).not.toContain("Try again in");
  });
});

describe("clampRetryAfterSeconds", () => {
  it("accepts only finite positive numbers, rounds up, caps at 24 h", () => {
    expect(clampRetryAfterSeconds(42)).toBe(42);
    expect(clampRetryAfterSeconds(0.1)).toBe(1);
    expect(clampRetryAfterSeconds(1e12)).toBe(86_400);
    for (const bad of [0, -1, Number.NaN, Infinity, "5", null, undefined])
      expect(clampRetryAfterSeconds(bad)).toBeUndefined();
  });
});
