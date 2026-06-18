import Link from "next/link";
import { cn } from "@/lib/utils";

export function buttonClasses(
  variant: "primary" | "outline" | "ghost" = "primary",
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center gap-2 px-8 py-3 text-[12px] uppercase tracking-[0.15em] transition duration-300",
    variant === "primary" &&
      "border border-[var(--color-black)] bg-[var(--color-gold-light)] text-[var(--color-black)] hover:bg-[var(--color-gold)] hover:text-[var(--color-warm-white)]",
    variant === "outline" &&
      "border border-[var(--color-black)] text-[var(--color-black)] hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-warm-white)]",
    variant === "ghost" &&
      "text-[var(--color-gold)] underline underline-offset-6",
    className,
  );
}

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  onClick,
}: Props) {
  if (href) {
    return (
      <Link href={href} className={buttonClasses(variant, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses(variant, className)}
    >
      {children}
    </button>
  );
}
