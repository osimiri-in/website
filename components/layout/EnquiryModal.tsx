"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type ModalState = {
  open: boolean;
  requirement?: string;
  sourcePage?: string;
};

export function EnquiryModal() {
  const [state, setState] = useState<ModalState>({ open: false });
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    requirement: "",
  });

  useEffect(() => {
    const open = (
      event: Event,
    ) => {
      const detail = (
        event as CustomEvent<{ requirement?: string; sourcePage?: string }>
      ).detail;
      setForm((current) => ({
        ...current,
        requirement: detail?.requirement || "",
      }));
      setState({
        open: true,
        requirement: detail?.requirement,
        sourcePage: detail?.sourcePage,
      });
    };

    window.addEventListener("osimiri:open-enquiry", open as EventListener);
    return () =>
      window.removeEventListener("osimiri:open-enquiry", open as EventListener);
  }, []);

  if (!state.open) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-full max-w-xl overflow-auto bg-[var(--color-warm-white)] p-6 md:p-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="eyebrow">Start A Conversation</p>
            <h3 className="font-heading text-4xl">
              Tell us about your project.
            </h3>
          </div>
          <button type="button" onClick={() => setState({ open: false })}>
            <X />
          </button>
        </div>
        <form className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="input-base"
              placeholder="Name"
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
            />
            <input
              className="input-base"
              placeholder="Phone"
              value={form.phone}
              onChange={(event) =>
                setForm((current) => ({ ...current, phone: event.target.value }))
              }
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="input-base"
              placeholder="Email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
            />
            <input
              className="input-base"
              placeholder="City"
              value={form.city}
              onChange={(event) =>
                setForm((current) => ({ ...current, city: event.target.value }))
              }
            />
          </div>
          <textarea
            className="input-base min-h-[140px]"
            placeholder="What are you looking for?"
            value={form.requirement}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                requirement: event.target.value,
              }))
            }
          />
          <p className="text-sm text-[var(--color-mid)]">
            Source: {state.sourcePage || "global"}
          </p>
          <button
            type="button"
            className="bg-[var(--color-black)] px-8 py-3 text-xs uppercase tracking-[0.15em] text-[var(--color-warm-white)]"
            onClick={() => setState({ open: false })}
          >
            Save For Supabase Setup
          </button>
        </form>
      </div>
    </div>
  );
}
