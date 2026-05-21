import Head from "next/head";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { getPublishedPortfolio } from "../lib/portfolio";
import VideoPortfolioGrid from "../components/VideoPortfolio/VideoPortfolioGrid";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoPortfolioPage({ items }) {
  const pageRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".vp-label",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          ".vp-title",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
          "-=0.3"
        )
        .fromTo(
          ".vp-subtitle",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".vp-count",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.4"
        );

      gsap.utils.toArray(".vp-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <>
      <Head>
        <title>Video Portfolio | Ayush Agrahari</title>
        <meta name="description" content="Project demos and video work by Ayush Agrahari." />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dev.png" />
      </Head>

      <div
        ref={pageRef}
        className="bg-lightBg text-darkText font-cabinet overflow-x-hidden min-h-screen"
      >
        {/* ── Page hero ───────────────────────────────────────────────── */}
        <header className="max-w-[1400px] mx-auto px-8 md:px-6 sm:px-4 pt-20 pb-16 md:pt-14 md:pb-12 sm:pt-10 sm:pb-8">
          <div className="vp-label mb-8 sm:mb-6">
            <span className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.3em] text-darkText/40">
              <span className="w-8 h-px bg-darkText/20 inline-block" />
              Video Portfolio
            </span>
          </div>

          <div className="mb-8 sm:mb-6 overflow-hidden">
            {"Project Demos.".split(" ").map((word, i) => (
              <span
                key={i}
                className="vp-title block font-bold leading-[0.9] text-[8rem] xl:text-[6rem] lg:text-[5rem] md:text-[4rem] sm:text-[3rem] ss:text-[2.4rem] text-darkText"
              >
                {word}
              </span>
            ))}
          </div>

          <div className="flex items-start gap-8 sm:flex-col sm:gap-4 mt-6">
            <p className="vp-subtitle text-darkText/50 text-lg md:text-base sm:text-sm font-poppins max-w-md leading-relaxed">
              Watch how ideas turn into shipped products — real builds, real results.
            </p>
            {items.length > 0 && (
              <span className="vp-count shrink-0 text-[11px] font-mono uppercase tracking-[0.2em] text-darkText/40 border border-darkText/10 rounded-full px-4 py-2">
                {String(items.length).padStart(2, "0")} Videos
              </span>
            )}
          </div>
        </header>

        {/* ── Divider ─────────────────────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-8 md:px-6 sm:px-4">
          <div className="h-px w-full bg-darkText/10" />
        </div>

        {/* ── Grid / Empty state ──────────────────────────────────────── */}
        <main className="max-w-[1400px] mx-auto px-8 md:px-6 sm:px-4 py-20 md:py-14 sm:py-10">
          {items.length > 0 ? (
            <VideoPortfolioGrid items={items} />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[40vh] text-center border border-darkText/10 rounded-2xl sm:rounded-xl bg-white p-10 shadow-sm">
              <span className="text-[11px] font-mono uppercase tracking-widest text-darkText/30 mb-6">
                00 | 00
              </span>
              <p className="text-2xl sm:text-xl font-bold text-darkText mb-3">Nothing here yet.</p>
              <p className="text-darkText/50 font-poppins text-sm max-w-xs leading-relaxed">
                Published videos will appear here once added from the dashboard.
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const items = await getPublishedPortfolio();
  return { props: { items } };
}
