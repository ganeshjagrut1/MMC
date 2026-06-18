"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

type GalleryImage = { url: string; category: string };

/** Filterable photo gallery with category tabs and animated transitions. */
export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const categories = useMemo(() => {
    const set: string[] = [];
    for (const img of images) {
      if (img.category && !set.includes(img.category)) set.push(img.category);
    }
    return ["All", ...set];
  }, [images]);

  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? images : images.filter((i) => i.category === active);

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-[var(--radius)] border px-5 py-2 text-sm font-medium transition-colors ${
              active === cat
                ? "border-primary bg-primary text-white"
                : "border-border bg-surface text-primary hover:border-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image grid */}
      <motion.div
        layout
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((img) => (
            <motion.div
              key={img.url}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] border border-border bg-surface"
            >
              <Image
                src={img.url}
                alt={img.category || "Gallery image"}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {img.category && (
                <span className="absolute bottom-2 left-2 rounded bg-secondary/80 px-2 py-0.5 text-xs font-medium text-white">
                  {img.category}
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
