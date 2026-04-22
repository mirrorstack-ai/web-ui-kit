import {
  useState,
  useRef,
  useEffect,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import { cn } from "@/utils/cn";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";

export interface AgentSidebarInputProps {
  onSend?: (message: string) => void;
  onAttachFile?: () => void;
  onMic?: () => void;
  placeholder?: string;
}

export function AgentSidebarInput({
  onSend,
  onAttachFile,
  onMic,
  placeholder = "Type a message...",
}: AgentSidebarInputProps) {
  const [text, setText] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [isMultiline, setIsMultiline] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 150)}px`;
    setIsMultiline(text.includes("\n") || el.scrollHeight > el.clientHeight + 2);
  }, [text]);

  const send = () => {
    if (!text.trim()) return;
    onSend?.(text);
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (isComposing || e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const iconBtnCls = "text-inverse-on-surface hover:bg-primary-container hover:text-primary";

  return (
    <div className="p-3 pt-2 shrink-0 flex flex-col">
      <div className="w-full p-1">
        <span className="text-background/80 text-sm">
          Tip — ctrl + c to interrupt
        </span>
      </div>
      <div className="flex flex-col w-full border-3 border-inverse-primary rounded-xl">
        <div
          className={cn(
            "justify-between w-full p-0.5 flex gap-0.5",
            isMultiline ? "flex-col" : "flex-row items-center",
          )}
        >
          {isMultiline ? (
            <>
              <textarea
                ref={textareaRef}
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                className="w-full text-on-secondary rounded-lg px-2 py-1 resize-none focus:outline-none bg-transparent"
                placeholder={placeholder}
                aria-label="Message to agent"
                rows={1}
              />
              <div className="flex w-full gap-0.5 items-center">
                <IconButton
                  icon="attach_file_add"
                  variant="text"
                  size="sm"
                  className={iconBtnCls}
                  onClick={onAttachFile}
                  aria-label="Attach file"
                />
                <IconButton
                  icon="mic"
                  variant="text"
                  size="sm"
                  className={iconBtnCls}
                  onClick={onMic}
                  aria-label="Voice input"
                />
                <div className="flex-1" />
                <IconButton
                  icon="send"
                  variant="filled"
                  size="sm"
                  className="bg-tertiary-container hover:bg-tertiary-container-dim"
                  onClick={send}
                  aria-label="Send message"
                />
              </div>
            </>
          ) : (
            <>
              <IconButton
                icon="attach_file_add"
                variant="text"
                size="sm"
                className={cn("shrink-0", iconBtnCls)}
                onClick={onAttachFile}
                aria-label="Attach file"
              />
              <textarea
                ref={textareaRef}
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                className="w-full text-on-secondary rounded-lg px-2 py-1 resize-none focus:outline-none bg-transparent"
                placeholder={placeholder}
                aria-label="Message to agent"
                rows={1}
              />
              <div className="flex gap-0.5">
                <IconButton
                  icon="mic"
                  variant="text"
                  size="sm"
                  className={iconBtnCls}
                  onClick={onMic}
                  aria-label="Voice input"
                />
                <IconButton
                  icon="send"
                  variant="filled"
                  size="sm"
                  className="bg-tertiary-container hover:bg-tertiary-container-dim"
                  onClick={send}
                  aria-label="Send message"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
