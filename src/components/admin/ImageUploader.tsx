"use client";

import { ArrowLeft, ArrowRight, ImagePlus, Loader2, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn, isAllowedImageUrl } from "@/lib/utils";

/**
 * Downscales big photos in the browser (max 2000px, WebP/JPEG) before upload —
 * keeps requests under hosting body limits (Vercel: 4.5 MB) and pages fast.
 */
async function shrink(file: File): Promise<Blob> {
  if (file.size < 600_000 || !/^image\/(jpeg|png|webp)$/.test(file.type)) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/webp", 0.86));
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file;
  }
}

async function uploadFile(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", await shrink(file), file.name);
  const res = await fetch("/api/admin/upload", { method: "POST", body });
  const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!res.ok || !data.url) throw new Error(data.error ?? "Upload failed");
  return data.url;
}

type Props = {
  name: string;
  defaultValue: string[];
  multiple?: boolean;
  max?: number;
  error?: string;
};

/**
 * Uploads images through /api/admin/upload and keeps the resulting URLs
 * in a hidden input (JSON array for `multiple`, plain string otherwise).
 */
export function ImageUploader({ name, defaultValue, multiple = false, max = 12, error }: Props) {
  const [images, setImages] = useState<string[]>(defaultValue.filter(Boolean));
  const [busy, setBusy] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [urlDraft, setUrlDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const limit = multiple ? max : 1;

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploadError("");
    setBusy(true);
    try {
      const room = limit - (multiple ? images.length : 0);
      const picked = Array.from(files).slice(0, Math.max(room, 1));
      const urls: string[] = [];
      for (const file of picked) urls.push(await uploadFile(file));
      setImages((prev) => (multiple ? [...prev, ...urls].slice(0, limit) : urls.slice(0, 1)));
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function addUrl() {
    const url = urlDraft.trim();
    if (!isAllowedImageUrl(url)) {
      setUploadError("Only Cloudinary or Unsplash image links are allowed — or upload a file.");
      return;
    }
    setUploadError("");
    setImages((prev) => (multiple ? [...prev, url].slice(0, limit) : [url]));
    setUrlDraft("");
  }

  const move = (from: number, to: number) =>
    setImages((prev) => {
      if (to < 0 || to >= prev.length) return prev;
      const next = [...prev];
      const [item] = next.splice(from, 1);
      if (item) next.splice(to, 0, item);
      return next;
    });

  return (
    <div>
      <input type="hidden" name={name} value={multiple ? JSON.stringify(images) : (images[0] ?? "")} />

      <div className={cn("grid gap-3", multiple ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "max-w-sm grid-cols-1")}>
        {images.map((src, i) => (
          <figure key={`${src}-${i}`} className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-cocoa/10 bg-ivory">
            <Image src={src} alt="" fill sizes="240px" className="object-cover" />
            {multiple && i === 0 && (
              <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-gold px-1.5 py-0.5 text-[10px] font-semibold uppercase text-cocoa">
                <Star size={10} /> Cover
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 flex justify-between gap-1 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
              {multiple ? (
                <div className="flex gap-1">
                  <IconBtn label="Move left" onClick={() => move(i, i - 1)} disabled={i === 0}>
                    <ArrowLeft size={14} />
                  </IconBtn>
                  <IconBtn label="Move right" onClick={() => move(i, i + 1)} disabled={i === images.length - 1}>
                    <ArrowRight size={14} />
                  </IconBtn>
                  {i !== 0 && (
                    <IconBtn label="Make cover" onClick={() => move(i, 0)}>
                      <Star size={14} />
                    </IconBtn>
                  )}
                </div>
              ) : (
                <span />
              )}
              <IconBtn label="Remove" onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))} danger>
                <Trash2 size={14} />
              </IconBtn>
            </div>
          </figure>
        ))}

        {images.length < limit || !multiple ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-cocoa/20 text-sm text-cocoa/60 transition hover:border-gold/60 hover:text-gold-dark disabled:opacity-60"
          >
            {busy ? <Loader2 size={22} className="animate-spin" /> : <ImagePlus size={22} strokeWidth={1.5} />}
            {busy ? "Uploading…" : !multiple && images.length ? "Replace image" : "Upload image"}
          </button>
        ) : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple={multiple}
        className="hidden"
        onChange={(e) => onFiles(e.target.files)}
      />

      <div className="mt-3 flex max-w-xl gap-2">
        <input
          value={urlDraft}
          onChange={(e) => setUrlDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addUrl();
            }
          }}
          placeholder="…or paste a Cloudinary / Unsplash image URL"
          className="w-full rounded-md border border-cocoa/10 bg-ivory px-3 py-2 text-xs text-cocoa placeholder:text-cocoa/25 focus:border-gold/60 focus:outline-none"
        />
        <button type="button" onClick={addUrl} className="rounded-md border border-cocoa/15 px-3 text-xs text-cocoa/70 hover:border-gold hover:text-gold-dark">
          Add
        </button>
      </div>

      {(uploadError || error) && <p className="mt-2 text-xs text-red-600">{uploadError || error}</p>}
      {multiple && <p className="mt-2 text-xs text-cocoa/50">JPG, PNG, WEBP or AVIF up to 8 MB. The first image is the cover. Max {max} images.</p>}
    </div>
  );
}

function IconBtn({ label, onClick, disabled, danger, children }: { label: string; onClick: () => void; disabled?: boolean; danger?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn("grid h-7 w-7 place-items-center rounded bg-black/60 text-white transition disabled:opacity-30", danger ? "hover:bg-red-500" : "hover:bg-gold hover:text-cocoa")}
    >
      {children}
    </button>
  );
}
