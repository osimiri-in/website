"use client";

import { useState } from "react";
import { X } from "lucide-react";

/**
 * Chip-based multi-value input. Type a value and press Enter or comma to add it
 * as a removable chip. Enter is handled here (preventDefault) so it never
 * submits the surrounding form.
 */
export function TagInput({
  value,
  onChange,
  placeholder = "Type a value and press Enter",
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [text, setText] = useState("");

  function addFrom(raw: string) {
    const parts = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!parts.length) return;
    const next = [...value];
    for (const p of parts) if (!next.includes(p)) next.push(p);
    onChange(next);
    setText("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addFrom(text);
    } else if (e.key === "Backspace" && !text && value.length) {
      onChange(value.slice(0, -1));
    }
  }

  function remove(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-[#ddd9d1] px-2 py-1.5 focus-within:border-[#35347a] focus-within:ring-2 focus-within:ring-[#35347a]/15">
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-md bg-[#ecebf7] px-2 py-1 text-xs font-medium text-[#35347a]"
        >
          {tag}
          <button
            type="button"
            onClick={() => remove(tag)}
            className="text-[#35347a]/60 hover:text-[#35347a]"
            aria-label={`Remove ${tag}`}
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={() => addFrom(text)}
        placeholder={value.length ? "" : placeholder}
        className="min-w-[8rem] flex-1 bg-transparent px-1 py-0.5 text-sm text-[#4a463f] outline-none"
      />
    </div>
  );
}
