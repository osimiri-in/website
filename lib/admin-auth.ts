/**
 * Tiny signed-session helper for the admin password gate.
 * Uses Web Crypto (HMAC-SHA256) so it runs in both the Edge middleware and
 * Node route handlers. The cookie value is `payloadB64.signatureB64`.
 */

export const ADMIN_COOKIE = "osimiri_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function toBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): Uint8Array {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmac(payload: string, secret: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  return new Uint8Array(sig);
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/** Constant-time string compare (for the password check). */
export function safeEqualStrings(a: string, b: string): boolean {
  const ea = new TextEncoder().encode(a);
  const eb = new TextEncoder().encode(b);
  return timingSafeEqual(ea, eb);
}

export async function createSessionToken(secret: string): Promise<string> {
  const payload = toBase64Url(
    new TextEncoder().encode(JSON.stringify({ iat: Date.now() })),
  );
  const sig = toBase64Url(await hmac(payload, secret));
  return `${payload}.${sig}`;
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!token || !secret) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expected = await hmac(payload, secret);
  if (!timingSafeEqual(fromBase64Url(sig), expected)) return false;

  try {
    const { iat } = JSON.parse(
      new TextDecoder().decode(fromBase64Url(payload)),
    ) as { iat: number };
    return typeof iat === "number" && Date.now() - iat < SESSION_TTL_MS;
  } catch {
    return false;
  }
}
