import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { detectImage, MAX_UPLOAD_BYTES, storeImage } from "@/lib/upload";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const admin = await getSession();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!rateLimit(`upload:${admin.id}`, 60, 10 * 60_000).ok) {
    return NextResponse.json({ error: "Too many uploads, slow down" }, { status: 429 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (file.size > MAX_UPLOAD_BYTES) return NextResponse.json({ error: "File is larger than 8 MB" }, { status: 413 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const type = detectImage(buffer);
  if (!type) return NextResponse.json({ error: "Only JPG, PNG, WEBP or AVIF images are allowed" }, { status: 415 });

  try {
    const url = await storeImage(buffer, type.ext);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("[upload]", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed" }, { status: 500 });
  }
}
