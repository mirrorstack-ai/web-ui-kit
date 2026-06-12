import type { AgentSidebarHistoryGroup } from "@/components/ui/agent/sidebar/types";
import type { AgentConversation } from "./client";

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
): AgentSidebarHistoryGroup[] {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfYesterday = startOfToday - 86_400_000;
  const startOfWeek = startOfToday - 6 * 86_400_000;

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
