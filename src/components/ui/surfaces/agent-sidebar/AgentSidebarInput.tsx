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
    const scrollH = el.scrollHeight;
    const singleLineH = parseInt(getComputedStyle(el).lineHeight) || 20;
    el.style.height = `${Math.min(scrollH, 150)}px`;
    setIsMultiline(scrollH > singleLineH + 4);
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

  const iconBtnCls = "text-inverse-on-surface/60 hover:text-inverse-on-surface";

  return (
    <div className="p-3 pt-2 shrink-0 flex flex-col">
      <div className="w-full px-1 pb-1">
        <span className="text-inverse-on-surface/40 text-xs">
          Tip — ctrl + c to interrupt
        </span>
      </div>
      <div className="flex flex-col w-full border border-outline-variant/30 rounded-xl bg-inverse-on-surface/8">
        <div
          className={cn(
            "justify-between w-full p-1 flex gap-0.5",
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
                className="w-full text-inverse-on-surface placeholder:text-inverse-on-surface/30 rounded-lg px-2 py-1 resize-none focus:outline-none bg-transparent text-sm"
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
                  className="bg-primary text-on-primary"
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
                className="w-full text-inverse-on-surface placeholder:text-inverse-on-surface/30 rounded-lg px-2 py-1 resize-none focus:outline-none bg-transparent text-sm"
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
                  className="bg-primary text-on-primary"
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
