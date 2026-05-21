import { useState } from "react";
import Image from "next/image";
import VideoPortfolioModal from "./VideoPortfolioModal";

export default function VideoPortfolioGrid({ items }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-6 sm:gap-5">
        {items.map((item, index) => (
          <button
            key={item._id}
            type="button"
            onClick={() => setSelected(item)}
            className="vp-card group w-full text-left rounded-2xl sm:rounded-xl overflow-hidden border border-darkText/10 bg-white hover:border-darkText/20 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-secondary/50 shadow-lg hover:shadow-xl"
          >
            {/* Thumbnail / video preview */}
            <div className="relative aspect-video w-full bg-darkText/5 overflow-hidden">
              {item.thumbnailUrl ? (
                <Image
                  src={item.thumbnailUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1060px) 100vw, 50vw"
                />
              ) : (
                <video
                  src={item.videoUrl}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  muted
                  preload="metadata"
                  playsInline
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-darkText/10 group-hover:bg-darkText/5 transition-colors duration-500" />

              {/* Play circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-14 sm:h-14 rounded-full border border-darkText/15 bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:border-secondary/60 group-hover:bg-secondary/20 group-hover:scale-110 transition-all duration-500 shadow-md">
                  {/* Triangle */}
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    className="ml-1 text-darkText group-hover:text-sectionAccent transition-colors duration-300"
                  >
                    <path d="M1 1L17 10L1 19V1Z" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* Index badge */}
              <div className="absolute top-5 left-5 sm:top-4 sm:left-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-darkText/60 border border-darkText/10 rounded-full px-3 py-1 bg-white/90 backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")} |{" "}
                  {String(items.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Card footer */}
            <div className="p-6 md:p-5 sm:p-4 flex items-start justify-between gap-4">
              <h3 className="text-xl md:text-lg sm:text-base font-bold text-darkText group-hover:text-darkText/70 transition-colors font-cabinet leading-tight">
                {item.title}
              </h3>
              <span className="shrink-0 text-darkText/30 group-hover:text-sectionAccent transition-colors duration-300 text-xl leading-none mt-0.5">
                ↗
              </span>
            </div>
          </button>
        ))}
      </div>

      <VideoPortfolioModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
