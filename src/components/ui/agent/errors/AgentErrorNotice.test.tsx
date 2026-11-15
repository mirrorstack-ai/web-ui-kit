import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useMemo } from "react";
import { AgentErrorNotice } from "./AgentErrorNotice";
import { useAgentChat } from "@/hooks/agent-chat/useAgentChat";
import type { AgentChatClient } from "@/hooks/agent-chat/client";

const SERVER_TEXT = "org acme-corp used 60 of 60 turns (tenant 9f2c)";

function refusingClient(): AgentChatClient {
  const now = new Date().toISOString();
  return {
    listConversations: vi.fn().mockResolvedValue({ items: [], nextCursor: null }),
    createConversation: vi
      .fn()
      .mockResolvedValue({ id: "c-1", appId: null, title: "", model: null, createdAt: now, updatedAt: now }),
    renameConversation: vi.fn(),
    deleteConversation: vi.fn(),
    patchConversationModel: vi.fn(),
    listConversationMessages: vi.fn().mockResolvedValue([]),
    fetchAgentModels: vi.fn().mockResolvedValue({ items: [] }),
    patchMessageFeedback: vi.fn(),
    // The 61st turn: refused at connect time with a 429.
    streamAgentReply: vi.fn().mockRejectedValue({
      status: 429,
      code: "agent_turn_limit",
      serverMessage: SERVER_TEXT,
      retryAfterSeconds: 90,
    }),
    streamAgentRerun: vi.fn(),
  } as unknown as AgentChatClient;
}

function Harness({ locale }: { locale: string }) {
  const client = useMemo(refusingClient, []);
  const chat = useAgentChat(client, { appId: null });
  return (
    <div>
      <button onClick={() => chat.send("61st")}>send</button>
      <AgentErrorNotice errorInfo={chat.errorInfo} locale={locale} />
    </div>
  );
}

afterEach(cleanup);

describe("AgentErrorNotice", () => {
  it("renders nothing without an error", () => {
    const { container } = render(<AgentErrorNotice errorInfo={null} locale="en" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("the 61st turn shows the per-code message and the wait in English, never the server text", async () => {
    render(<Harness locale="en" />);
    await act(async () => {
      fireEvent.click(screen.getByText("send"));
    });
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(
      "You have reached the message limit for now. Try again in 2 minutes.",
    );
    expect(alert).toHaveAttribute("data-error-code", "agent_turn_limit");
    expect(document.body.textContent).not.toContain("acme-corp");
    expect(document.body.textContent).not.toContain("9f2c");
  });

  it("the same refusal reads in zh-TW for a zh-TW reader", async () => {
    render(<Harness locale="zh-TW" />);
    await act(async () => {
      fireEvent.click(screen.getByText("send"));
    });
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("你暫時已達訊息數量上限。請於 2 分鐘後再試。");
    expect(document.body.textContent).not.toContain("acme-corp");
  });
});
