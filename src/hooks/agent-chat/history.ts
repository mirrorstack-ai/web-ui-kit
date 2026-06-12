import type { AgentConversation } from "./client";

/** One past conversation in a history group. */
export interface ConversationHistoryItem {
  id: string;
  title: string;
  /** ISO 8601 UTC string. */
  updatedAt: string;
}

/** A labeled recency bucket of past conversations. The sidebar's
 *  AgentSidebarHistoryGroup is an alias of this shape — the type lives here
 *  so the data layer never imports from the component layer. */
export interface ConversationHistoryGroup {
  label: string;
  items: ConversationHistoryItem[];
}

/** Localized bucket labels for groupConversationsByRecency. */
export interface RecencyLabels {
  today: string;
  yesterday: string;
  thisWeek: string;
  earlier: string;
}

/** Bucket conversations (already newest-first) by updatedAt calendar
 *  recency. Empty buckets are omitted. */
export function groupConversationsByRecency(
  items: AgentConversation[],
  labels: RecencyLabels,
): ConversationHistoryGroup[] {
  const now = new Date();
  // Calendar-day arithmetic (not fixed ms offsets) so DST transitions —
  // where a local day is 23 or 25 hours — still bucket correctly.
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).getTime();
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6).getTime();

  const buckets: Record<keyof RecencyLabels, AgentConversation[]> = {
    today: [],
    yesterday: [],
    thisWeek: [],
    earlier: [],
  };
  for (const conv of items) {
    const ts = Date.parse(conv.updatedAt);
    if (ts >= startOfToday) buckets.today.push(conv);
    else if (ts >= startOfYesterday) buckets.yesterday.push(conv);
    else if (ts >= startOfWeek) buckets.thisWeek.push(conv);
    else buckets.earlier.push(conv);
  }

  return (Object.keys(buckets) as (keyof RecencyLabels)[])
    .filter((key) => buckets[key].length > 0)
    .map((key) => ({
      label: labels[key],
      items: buckets[key].map((c) => ({ id: c.id, title: c.title, updatedAt: c.updatedAt })),
    }));
}
