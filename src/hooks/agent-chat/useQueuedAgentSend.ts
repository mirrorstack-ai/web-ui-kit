import { useCallback, useEffect, useState } from "react";
import type { AgentQueuedMessage } from "@/components/ui/agent/sidebar/AgentSidebarInput";
import type { AgentChatMessage } from "./useAgentChat";

/** What useQueuedAgentSend needs from useAgentChat — structural, so hosts
 *  can wrap the chat in their own context without losing the queue. */
export interface QueuedAgentChatSource {
  messages: AgentChatMessage[];
  send: (message: string) => void;
}

export interface QueuedAgentSend {
  /** Send now, or queue when a reply is still streaming. */
  send: (message: string) => void;
  /** FIFO queue of messages typed while the agent was responding —
   *  feed straight into AgentSidebarInput's queuedMessages. */
  queued: AgentQueuedMessage[];
  cancelQueued: (id: string) => void;
}

/**
 * Queue-aware wrapper around useAgentChat().send: a message sent while a
 * reply is still streaming no longer cuts that reply off (send() aborts the
 * in-flight stream) — it waits in a FIFO queue and goes out when the stream
 * settles, one per turn so each queued message gets its own full reply.
 *
 * `scopeKey` mirrors the chat hook's reset key (the route's app ref):
 * when the thread resets on scope change, pending queued messages must not
 * leak into the next app's conversation.
 */
export function useQueuedAgentSend(
  chat: QueuedAgentChatSource,
  scopeKey: string | null,
): QueuedAgentSend {
  const [queued, setQueued] = useState<AgentQueuedMessage[]>([]);

  // The streaming reply placeholder is the only message with streaming: true.
  const isStreaming = chat.messages.some((m) => m.role === "agent" && m.streaming);

  // Scope switch resets the thread (useAgentChat) — drop the queue with it.
  useEffect(() => {
    setQueued([]);
  }, [scopeKey]);

  const send = useCallback(
    (message: string) => {
      const content = message.trim();
      if (!content) return;
      if (isStreaming) {
        setQueued((prev) => [...prev, { id: `queued-${crypto.randomUUID()}`, text: content }]);
        return;
      }
      chat.send(content);
    },
    [chat.send, isStreaming], // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Flush the queue head once the stream settles (done, error, or
  // interrupted all clear the streaming flag). Sending re-raises the flag
  // synchronously, so the rest of the queue waits for the next turn.
  useEffect(() => {
    if (isStreaming || queued.length === 0) return;
    const [head, ...rest] = queued;
    setQueued(rest);
    chat.send(head.text);
  }, [isStreaming, queued, chat.send]); // eslint-disable-line react-hooks/exhaustive-deps

  const cancelQueued = useCallback((id: string) => {
    setQueued((prev) => prev.filter((q) => q.id !== id));
  }, []);

  return { send, queued, cancelQueued };
}
