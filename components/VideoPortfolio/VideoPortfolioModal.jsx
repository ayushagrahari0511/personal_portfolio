import { useEffect, useRef } from "react";

export default function VideoPortfolioModal({ item, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!item) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [item, onClose]);

  // Pause + reset when modal closes
  useEffect(() => {
    if (!item && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [item]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    onClose();
  };

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-md p-6 md:p-4 sm:p-3"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="vp-modal-title"
    >
      <div
        className="relative w-full max-w-5xl md:max-w-[calc(100vw-2rem)] flex flex-col bg-white border border-darkText/10 rounded-2xl sm:rounded-xl overflow-hidden shadow-2xl max-h-[90vh] sm:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-5 right-5 sm:top-4 sm:right-4 z-10 w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-darkText/10 bg-lightBg text-darkText/70 hover:text-darkText hover:border-darkText/25 transition-all"
        >
          {/* × */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Video — padded inward so rounded modal corners aren't clipped */}
        <div className="p-4 pb-0 sm:p-3 sm:pb-0">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black">
            <video
              ref={videoRef}
              src={item.videoUrl}
              controls
              autoPlay
              playsInline
              poster={item.thumbnailUrl}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Title bar */}
        <div className="flex items-center justify-between gap-4 px-8 md:px-6 sm:px-5 py-5 sm:py-4 border-t border-darkText/5">
          <h2
            id="vp-modal-title"
            className="text-xl md:text-lg sm:text-base font-bold text-darkText font-cabinet pr-10 leading-tight"
          >
            {item.title}
          </h2>
          <span className="shrink-0 text-[10px] font-mono uppercase tracking-widest text-darkText/40">
            Video
          </span>
        </div>
      </div>
    </div>
  );
}
