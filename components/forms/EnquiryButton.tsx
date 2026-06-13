"use client";

import { buttonClasses } from "@/components/ui/Button";

export function EnquiryButton({
  label,
  variant = "primary",
  className,
  requirement,
  sourcePage,
}: {
  label: string;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  requirement?: string;
  sourcePage?: string;
}) {
  return (
    <button
      type="button"
      className={buttonClasses(variant, className)}
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent("osimiri:open-enquiry", {
            detail: { requirement, sourcePage },
          }),
        );
      }}
    >
      {label}
    </button>
  );
}
