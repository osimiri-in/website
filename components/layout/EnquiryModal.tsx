"use client";

import { useEffect, useState } from "react";
import { X, Loader2, Check } from "lucide-react";

const EMPTY = { name: "", phone: "", email: "", city: "", requirement: "" };

export function EnquiryModal() {
  const [open, setOpen] = useState(false);
  const [sourcePage, setSourcePage] = useState("global");
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (
        event as CustomEvent<{ requirement?: string; sourcePage?: string }>
      ).detail;
      setForm({ ...EMPTY, requirement: detail?.requirement || "" });
      setSourcePage(detail?.sourcePage || "global");
      setStatus("idle");
      setError("");
      setOpen(true);
    };
    window.addEventListener("osimiri:open-enquiry", handler as EventListener);
    return () =>
      window.removeEventListener("osimiri:open-enquiry", handler as EventListener);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function update(key: keyof typeof EMPTY, value: string) {
    setForm((c) => ({ ...c, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.requirement.trim()) {
      setError("Please add your name, phone, and what you're looking for.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/forms/general_enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sourcePage }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="absolute right-0 top-0 h-full w-full max-w-xl overflow-auto bg-[var(--color-warm-white)] p-6 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="eyebrow">Start A Conversation</p>
            <h3 className="font-heading text-4xl">Tell us about your project.</h3>
          </div>
          <button type="button" aria-label="Close" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {status === "done" ? (
          <div className="flex flex-col items-start gap-4 py-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-gold-light)]">
              <Check className="h-6 w-6 text-[var(--color-black)]" />
            </span>
            <h4 className="font-heading text-3xl">Thank you.</h4>
            <p className="body-copy">
              We&apos;ve received your enquiry and will get back to you within one
              business day. For anything urgent, WhatsApp us on +91 80504 34040.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-2 border border-[var(--color-black)] px-8 py-3 text-xs uppercase tracking-[0.15em] text-[var(--color-black)] transition hover:bg-[var(--color-gold-light)]"
            >
              Close
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <input className="input-base" placeholder="Name*" value={form.name} onChange={(e) => update("name", e.target.value)} />
              <input className="input-base" placeholder="Phone*" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input className="input-base" type="email" placeholder="Email" value={form.email} onChange={(e) => update("email", e.target.value)} />
              <input className="input-base" placeholder="City" value={form.city} onChange={(e) => update("city", e.target.value)} />
            </div>
            <textarea
              className="input-base min-h-[140px]"
              placeholder="What are you looking for?*"
              value={form.requirement}
              onChange={(e) => update("requirement", e.target.value)}
            />
            {error ? (
              <p className="text-sm text-[#b4493d]">{error}</p>
            ) : (
              <p className="text-sm text-[var(--color-mid)]">
                Fields marked * are required.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 bg-[var(--color-black)] px-8 py-3 text-xs uppercase tracking-[0.15em] text-[var(--color-warm-white)] transition hover:opacity-90 disabled:opacity-60"
            >
              {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {status === "loading" ? "Sending…" : "Send Enquiry"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
