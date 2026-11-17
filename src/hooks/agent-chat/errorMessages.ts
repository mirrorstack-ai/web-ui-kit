// Per-locale copy for agent refusal/error codes. The kit renders ONLY from
// this map — never the server's free-text message (it is unreviewed and may
// carry tenant detail; same leak class as model-written images, #438). To add
// a language, add one entry to AGENT_ERROR_COPY; an unknown locale falls back
// to its language prefix, then to English.

export interface AgentErrorCopy {
  /** code → sentence. A code missing here falls back to `fallback`. */
  messages: Record<string, string>;
  fallback: string;
  /** Wait-time sentence for a refusal that carries `retryAfterSeconds`. */
  wait: (seconds: number) => string;
  /** Joins the message and the wait sentence (CJK: none, Latin: a space). */
  join: string;
}

// Longest wait the UI will state; a larger value is a server bug, not a plan.
export const MAX_RETRY_AFTER_SECONDS = 86_400;

const en: AgentErrorCopy = {
  messages: {
    send_failed: "Your message could not be sent. Please try again.",
    reply_failed: "The assistant could not finish its reply. Please try again.",
    persist_failed: "The reply could not be saved. Please try again.",
    stream_interrupted: "The reply was interrupted. Please try again.",
    load_failed: "This conversation could not be loaded. Please try again.",
    agent_turn_limit: "You have reached the message limit for now.",
    daily_ai_ceiling: "The daily AI usage limit has been reached.",
    rate_limited: "Too many requests right now.",
    prompt_too_long: "Your message is too long. Please shorten it and try again.",
    ai_unavailable: "The AI assistant is unavailable right now. Please try again later.",
    ai_credits_exhausted: "Your AI credits have run out.",
    ask_unlinked: "This question can't be answered any more. Please ask again.",
  },
  fallback: "Something went wrong. Please try again.",
  wait: (s) => `Try again in ${formatEn(s)}.`,
  join: " ",
};

const zhTW: AgentErrorCopy = {
  messages: {
    send_failed: "訊息無法送出，請再試一次。",
    reply_failed: "助理未能完成回覆，請再試一次。",
    persist_failed: "回覆無法儲存，請再試一次。",
    stream_interrupted: "回覆被中斷，請再試一次。",
    load_failed: "無法載入這段對話，請再試一次。",
    agent_turn_limit: "你暫時已達訊息數量上限。",
    daily_ai_ceiling: "已達每日 AI 使用上限。",
    rate_limited: "目前請求過多。",
    prompt_too_long: "訊息太長，請縮短後再試一次。",
    ai_unavailable: "AI 助理目前無法使用，請稍後再試。",
    ai_credits_exhausted: "你的 AI 額度已用完。",
    ask_unlinked: "這個問題已無法回答，請重新提問。",
  },
  fallback: "發生錯誤，請再試一次。",
  wait: (s) => `請於 ${formatZh(s)}後再試。`,
  join: "",
};

function formatEn(s: number): string {
  if (s < 60) return `${s} second${s === 1 ? "" : "s"}`;
  const m = Math.ceil(s / 60);
  if (m < 60) return `${m} minute${m === 1 ? "" : "s"}`;
  const h = Math.ceil(m / 60);
  return `${h} hour${h === 1 ? "" : "s"}`;
}

function formatZh(s: number): string {
  if (s < 60) return `${s} 秒`;
  const m = Math.ceil(s / 60);
  if (m < 60) return `${m} 分鐘`;
  return `${Math.ceil(m / 60)} 小時`;
}

/** Codes the server documents for the agent surface (the English map is the
 *  source of truth; every locale must carry the same keys — see the test). */
export const KNOWN_AGENT_CODES: ReadonlySet<string> = new Set(Object.keys(en.messages));

export const AGENT_ERROR_COPY: Record<string, AgentErrorCopy> = {
  en,
  "zh-TW": zhTW,
};

function copyFor(locale: string): AgentErrorCopy {
  if (AGENT_ERROR_COPY[locale]) return AGENT_ERROR_COPY[locale];
  const lang = locale.split("-")[0];
  const sameLang = Object.keys(AGENT_ERROR_COPY).find((k) => k.split("-")[0] === lang);
  return AGENT_ERROR_COPY[sameLang ?? "en"];
}

/** Sanitise a wait time from the wire: finite, > 0, whole seconds, capped. */
export function clampRetryAfterSeconds(v: unknown): number | undefined {
  if (typeof v !== "number" || !Number.isFinite(v) || v <= 0) return undefined;
  return Math.min(Math.ceil(v), MAX_RETRY_AFTER_SECONDS);
}

/** The user-facing sentence for an agent error code in `locale`, plus the wait
 *  sentence when `retryAfterSeconds` is given. Never takes server text. */
export function agentErrorMessage(
  code: string,
  locale: string,
  retryAfterSeconds?: number,
): string {
  const copy = copyFor(locale);
  const base = copy.messages[code] ?? copy.fallback;
  const wait = clampRetryAfterSeconds(retryAfterSeconds);
  if (wait === undefined) return base;
  return `${base}${copy.join}${copy.wait(wait)}`;
}
