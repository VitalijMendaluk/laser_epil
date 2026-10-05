"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, useState, type PointerEvent } from "react";

/** Draggable before/after comparison. Keyboard accessible via the range input. */
export function BeforeAfterSlider({ before, after, caption }: { before: string; after: string; caption: string }) {
  if (!before) return <WorkPhoto src={after} caption={caption} />;
  return <Compare before={before} after={after} caption={caption} />;
}

/** A single portfolio photo (no "before" image). */
function WorkPhoto({ src, caption }: { src: string; caption: string }) {
  return (
    <figure>
      <div className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-nude">
        <Image src={src} alt={caption} fill sizes="(min-width: 1024px) 420px, 90vw" className="object-cover transition-transform duration-[1.4s] ease-lux group-hover:scale-105" />
      </div>
      {caption && <figcaption className="mt-4 text-center font-display text-xl text-cocoa-2">{caption}</figcaption>}
    </figure>
  );
}

function Compare({ before, after, caption }: { before: string; after: string; caption: string }) {
  const t = useTranslations("results");
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = (clientX: number) => {
    const rect = box.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };
  const onDown = (e: PointerEvent) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    moveTo(e.clientX);
  };

  return (
    <figure>
      <div
        ref={box}
        className="relative aspect-[4/5] touch-pan-y select-none overflow-hidden rounded-[1.75rem] bg-nude"
        onPointerDown={onDown}
        onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <Image src={after} alt={`${t("after")}${caption ? ` — ${caption}` : ""}`} fill sizes="(min-width: 1024px) 420px, 90vw" className="pointer-events-none object-cover" draggable={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={before} alt={`${t("before")}${caption ? ` — ${caption}` : ""}`} fill sizes="(min-width: 1024px) 420px, 90vw" className="pointer-events-none object-cover" draggable={false} />
        </div>

        <span className="absolute left-4 top-4 rounded-full bg-cocoa/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">{t("before")}</span>
        <span className="absolute right-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cocoa backdrop-blur">{t("after")}</span>

        <div className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_12px_rgba(0,0,0,0.25)]" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-gold-dark shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={t("drag")}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      {caption && <figcaption className="mt-4 text-center font-display text-xl text-cocoa-2">{caption}</figcaption>}
    </figure>
  );
}
