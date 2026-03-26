"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import { cn } from "../utils/cn";
import { IconButton } from "./IconButton";

interface AgentSidebarInputProps {
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
  const [inputText, setInputText] = useState("");
  const [textareaRows, setTextareaRows] = useState(1);
  const [forceMultiline, setForceMultiline] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const singleLineRef = useRef<HTMLTextAreaElement>(null);
  const multilineRef = useRef<HTMLTextAreaElement>(null);
  const overflowTimerRef = useRef<number | null>(null);
  const forceMultilineRef = useRef(forceMultiline);
  const inputTextRef = useRef(inputText);

  forceMultilineRef.current = forceMultiline;
  inputTextRef.current = inputText;

  const isMultiline = inputText.includes("\n") || forceMultiline;

  useEffect(() => {
    if (isMultiline && multilineRef.current) {
      multilineRef.current.focus();
      const len = multilineRef.current.value.length;
      multilineRef.current.setSelectionRange(len, len);
    } else if (!isMultiline && singleLineRef.current) {
      singleLineRef.current.focus();
      const len = singleLineRef.current.value.length;
      singleLineRef.current.setSelectionRange(len, len);
    }
  }, [isMultiline]);

  // Clear pending timeout on unmount
  useEffect(() => {
    return () => {
      if (overflowTimerRef.current) clearTimeout(overflowTimerRef.current);
    };
  }, []);

  const checkOverflow = useCallback(() => {
    const currentForceMultiline = forceMultilineRef.current;
    const currentInputText = inputTextRef.current;
    const currentIsMultiline = currentInputText.includes("\n") || currentForceMultiline;

    if (!currentIsMultiline && singleLineRef.current) {
      if (singleLineRef.current.scrollHeight > singleLineRef.current.clientHeight + 2) {
        setForceMultiline(true);
      }
    }

    if (currentForceMultiline && !currentInputText.includes("\n") && singleLineRef.current) {
      const ref = singleLineRef.current;
      if (ref.scrollWidth <= ref.clientWidth + 2) {
        setForceMultiline(false);
        setTextareaRows(1);
      }
    }

    if (currentInputText.length === 0) {
      setForceMultiline(false);
      setTextareaRows(1);
    }
  }, []);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);

    if (!e.target.value) {
      setTextareaRows(1);
      setForceMultiline(false);
      return;
    }

    if (overflowTimerRef.current) clearTimeout(overflowTimerRef.current);
    overflowTimerRef.current = window.setTimeout(checkOverflow, 0);

    if (isMultiline && multilineRef.current) {
      const el = multilineRef.current;
      el.rows = 1;
      void el.offsetHeight;
      const rawLineHeight = window.getComputedStyle(el).lineHeight;
      const lineHeight = rawLineHeight === "normal"
        ? parseFloat(window.getComputedStyle(el).fontSize) * 1.5
        : parseInt(rawLineHeight, 10);
      const padding =
        parseInt(window.getComputedStyle(el).paddingTop) +
        parseInt(window.getComputedStyle(el).paddingBottom);
      const needed = Math.ceil((el.scrollHeight - padding) / lineHeight);
      const rows = Math.min(Math.max(needed, 1), 6);
      setTextareaRows(rows);
      el.rows = rows;
    } else {
      setTextareaRows(1);
    }
  };

  const send = () => {
    if (!inputText.trim()) return;
    onSend?.(inputText);
    setInputText("");
    setTextareaRows(1);
    setForceMultiline(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (isComposing || e.nativeEvent.isComposing) return;
    if (e.key !== "Enter") return;
    if (e.shiftKey) return;

    e.preventDefault();
    send();
  };

  const textareaClass =
    "w-full text-on-secondary rounded-lg px-2 py-1 resize-none focus:outline-none bg-transparent";

  return (
    <div className="p-3 pt-2 flex-shrink-0 flex-col flex">
      <div className="w-full p-1">
        <span className="text-background/80 text-sm">
          Tip — ctrl + c to interrupt
        </span>
      </div>
      <div className="flex flex-col w-full border-3 border-inverse-primary rounded-xl">
        <div
          className={cn(
            "justify-between w-full p-0.5 flex gap-0.5",
            isMultiline ? "flex-col" : "flex-row items-center"
          )}
        >
          {isMultiline ? (
            <>
              <textarea
                ref={multilineRef}
                value={inputText}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                className={textareaClass}
                placeholder={placeholder}
                aria-label="Message to agent"
                rows={textareaRows}
              />
              <div className="flex w-full gap-0.5 items-center">
                <IconButton
                  icon="attach_file_add"
                  variant="text"
                  size="sm"
                  className="group/button text-inverse-on-surface hover:bg-primary-container hover:text-primary"
                  onClick={onAttachFile}
                  title="Attach file"
                />
                <IconButton
                  icon="mic"
                  variant="text"
                  size="sm"
                  className="group/button text-inverse-on-surface hover:bg-primary-container hover:text-primary"
                  onClick={onMic}
                  title="Voice input"
                />
                <div className="flex-1" />
                <IconButton
                  icon="send"
                  variant="filled"
                  size="sm"
                  className="bg-tertiary-container hover:bg-tertiary-container-dim"
                  onClick={send}
                  title="Send message"
                />
              </div>
            </>
          ) : (
            <>
              <IconButton
                icon="attach_file_add"
                variant="text"
                size="sm"
                className="shrink-0 group/button text-inverse-on-surface hover:bg-primary-container hover:text-primary"
                onClick={onAttachFile}
                title="Attach file"
              />
              <textarea
                ref={singleLineRef}
                value={inputText}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                className={textareaClass}
                placeholder={placeholder}
                aria-label="Message to agent"
                rows={1}
              />
              <div className="flex gap-0.5">
                <IconButton
                  icon="mic"
                  variant="text"
                  size="sm"
                  className="group/button text-inverse-on-surface hover:bg-primary-container hover:text-primary"
                  onClick={onMic}
                  title="Voice input"
                />
                <IconButton
                  icon="send"
                  variant="filled"
                  size="sm"
                  className="bg-tertiary-container hover:bg-tertiary-container-dim"
                  onClick={send}
                  title="Send message"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
