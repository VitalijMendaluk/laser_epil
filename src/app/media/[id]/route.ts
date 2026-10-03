import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

/** Serves images uploaded in the admin when Cloudinary is not configured. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[a-z0-9]{10,40}$/.test(id)) return new Response("Not found", { status: 404 });
  const img = await prisma.storedImage.findUnique({ where: { id } });
  if (!img) return new Response("Not found", { status: 404 });
  return new Response(Buffer.from(img.data), {
    headers: {
      "Content-Type": img.mime,
      "Content-Length": String(img.size),
      // Content never changes for an id — cache forever.
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
