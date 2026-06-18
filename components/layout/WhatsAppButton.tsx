import Image from "next/image";
import Link from "next/link";

const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX";
const text = encodeURIComponent("Hi, I'm interested in OSIMIRI furniture.");

export function WhatsAppButton() {
  return (
    <Link
      href={`https://wa.me/${number}?text=${text}`}
      target="_blank"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--color-black)_12%,transparent)] bg-white shadow-[0_18px_40px_rgba(111,77,56,0.14)] transition hover:-translate-y-0.5 hover:border-[var(--color-gold)] hover:bg-[var(--color-warm-white)]"
      aria-label="Chat with us on WhatsApp"
    >
      <Image
        src="/whatsapp-color-svgrepo-com.svg"
        alt="WhatsApp"
        width={24}
        height={24}
        className="h-6 w-6"
      />
    </Link>
  );
}
