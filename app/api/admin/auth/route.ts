import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createSessionToken,
  safeEqualStrings,
} from "@/lib/admin-auth";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";
const SECRET = process.env.ADMIN_SESSION_SECRET ?? "";

// Basic in-memory brute-force protection: lock an IP after too many failures.
// Note: per-instance only (resets on cold start / doesn't share across Vercel
// regions) — a shared store (Upstash/Redis) is the hardened version.
const MAX_FAILS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const attempts = new Map<string, { fails: number; lockedUntil: number }>();

function clientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  if (!ADMIN_PASSWORD || !SECRET) {
    return NextResponse.json(
      {
        error:
          "Admin login is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET in your environment.",
      },
      { status: 503 },
    );
  }

  const ip = clientIp(request);
  const now = Date.now();
  const rec = attempts.get(ip);
  if (rec && rec.lockedUntil > now) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429 },
    );
  }

  let password = "";
  try {
    ({ password = "" } = (await request.json()) as { password?: string });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!password || !safeEqualStrings(password, ADMIN_PASSWORD)) {
    const fails = (rec && rec.lockedUntil <= now ? 0 : rec?.fails ?? 0) + 1;
    attempts.set(ip, {
      fails,
      lockedUntil: fails >= MAX_FAILS ? now + WINDOW_MS : 0,
    });
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  attempts.delete(ip);

  const token = await createSessionToken(SECRET);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
