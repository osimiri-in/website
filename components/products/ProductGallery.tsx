"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function ProductGallery({
  images,
  title,
  mainAlt,
}: {
  images: string[];
  title: string;
  mainAlt: string;
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  // Keep the active index valid if the image list changes.
  useEffect(() => {
    if (active > images.length - 1) setActive(0);
  }, [images.length, active]);

  // Close the lightbox on Escape / navigate with arrows.
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setActive((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom, images.length]);

  const current = images[active] ?? images[0];

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setZoom(true)}
        aria-label="View larger image"
        className="group block w-full cursor-zoom-in overflow-hidden border border-black/10 bg-[var(--color-warm-white)]"
      >
        <Image
          src={current}
          alt={mainAlt}
          width={1400}
          height={1200}
          className="h-[560px] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          priority
        />
      </button>

      {images.length > 1 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.slice(0, 8).map((image, index) => (
            <button
              type="button"
              key={`${image}-${index}`}
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={index === active}
              className={`overflow-hidden border bg-[var(--color-warm-white)] transition ${
                index === active
                  ? "border-[var(--color-gold)] ring-1 ring-[var(--color-gold)]"
                  : "border-black/10 hover:border-[var(--color-gold)]"
              }`}
            >
              <Image
                src={image}
                alt={`${title} view ${index + 1}`}
                width={600}
                height={600}
                className={`aspect-square w-full object-cover ${
                  index === active ? "" : "opacity-90 hover:opacity-100"
                }`}
              />
            </button>
          ))}
        </div>
      ) : null}

      {/* Lightbox */}
      {zoom ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setZoom(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} enlarged image`}
        >
          <button
            type="button"
            onClick={() => setZoom(false)}
            aria-label="Close"
            className="absolute right-5 top-5 text-3xl leading-none text-white/80 hover:text-white"
          >
            &times;
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((i) => (i - 1 + images.length) % images.length);
                }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 px-3 py-2 text-4xl text-white/70 hover:text-white"
              >
                &#8249;
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((i) => (i + 1) % images.length);
                }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-2 text-4xl text-white/70 hover:text-white"
              >
                &#8250;
              </button>
            </>
          ) : null}

          <img
            src={current}
            alt={mainAlt}
            className="max-h-[90vh] max-w-[92vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 ? (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm tracking-[0.14em] text-white/70">
              {active + 1} / {images.length}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
