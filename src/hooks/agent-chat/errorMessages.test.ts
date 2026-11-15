import { describe, expect, it } from "vitest";
import { agentErrorMessage, clampRetryAfterSeconds } from "./errorMessages";

describe("agentErrorMessage", () => {
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
