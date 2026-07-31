"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/forms/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("done");
      setMessage("Thanks — you're subscribed.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <p className="mt-6 text-[15px] leading-7 text-[var(--color-black)]">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-base min-h-[50px]"
          placeholder="Your email"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="min-h-[50px] border border-[var(--color-black)] bg-[var(--color-gold-light)] px-6 py-3 text-xs uppercase tracking-[0.15em] text-black transition hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-warm-white)] disabled:opacity-60"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {status === "error" ? (
        <p className="mt-2 text-sm text-[#b4493d]">{message}</p>
      ) : null}
    </form>
  );
}
