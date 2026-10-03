import "server-only";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "./prisma";

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

const SIGNATURES: { mime: string; ext: string; test: (b: Buffer) => boolean }[] = [
  { mime: "image/jpeg", ext: "jpg", test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { mime: "image/png", ext: "png", test: (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
  { mime: "image/webp", ext: "webp", test: (b) => b.subarray(0, 4).toString() === "RIFF" && b.subarray(8, 12).toString() === "WEBP" },
  { mime: "image/avif", ext: "avif", test: (b) => b.subarray(4, 12).toString() === "ftypavif" },
];

/** Detect the real image type from magic bytes (never trust the client-provided MIME). */
export function detectImage(buffer: Buffer) {
  return SIGNATURES.find((s) => s.test(buffer)) ?? null;
}

export function cloudinaryConfigured() {
  return Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
}

export async function storeImage(buffer: Buffer, ext: string): Promise<string> {
  if (cloudinaryConfigured()) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: process.env.CLOUDINARY_FOLDER || "laser-studio", resource_type: "image", transformation: [{ width: 2400, crop: "limit", quality: "auto" }] },
          (error, res) => (error || !res ? reject(error ?? new Error("Upload failed")) : resolve(res)),
        )
        .end(buffer);
    });
    return result.secure_url;
  }

  // No Cloudinary: keep the image in PostgreSQL and serve it from /media/<id>.
  // Works on serverless hosts (Vercel) where the file system is not persistent.
  const mime = SIGNATURES.find((sig) => sig.ext === ext)?.mime ?? "application/octet-stream";
  const row = await prisma.storedImage.create({ data: { mime, data: new Uint8Array(buffer), size: buffer.length }, select: { id: true } });
  return `/media/${row.id}`;
}
