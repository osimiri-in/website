import Link from "next/link";

const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX";
const text = encodeURIComponent("Hi, I'm interested in OSIMIRI furniture.");

export function WhatsAppButton() {
  return (
    <Link
      href={`https://wa.me/${number}?text=${text}`}
      target="_blank"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
      aria-label="Chat with us on WhatsApp"
    >
      WA
    </Link>
  );
}
