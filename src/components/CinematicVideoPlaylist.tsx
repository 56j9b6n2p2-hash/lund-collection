import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

export type CinematicClip = {
  desktopSrc: string;
  mobileSrc: string;
  poster: string;
  alt: string;
  place: string;
};

/**
 * A muted, looping background film that crossfades between several Lund
 * locations. The next clip is only played when it is ready, so the current
 * scene stays visible instead of flashing an empty video element.
 */
export function CinematicVideoPlaylist({
  clips,
  interval = 9000,
  priority = false,
  className,
  mediaClassName,
  overlayClassName,
  showPlaceLabel = false,
}: {
  clips: CinematicClip[];
  interval?: number;
  priority?: boolean;
  className?: string;
  mediaClassName?: string;
  overlayClassName?: string;
  showPlaceLabel?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const pendingRef = useRef<number | null>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ready, setReady] = useState<boolean[]>(() =>
    clips.map(() => false),
  );
  const [reduceMotion, setReduceMotion] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [inView, setInView] = useState(priority);
  const [documentVisible, setDocumentVisible] = useState(
    () => typeof document === "undefined" || !document.hidden,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);

    const connection = (navigator as NavigatorWithConnection).connection;
    setSaveData(Boolean(connection?.saveData));

    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (priority || reduceMotion || saveData || shouldLoad) return;
    const node = wrapRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "450px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [priority, reduceMotion, saveData, shouldLoad]);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibility = () => setDocumentVisible(!document.hidden);
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const showVideo = shouldLoad && !reduceMotion && !saveData;
  const canPlay = showVideo && inView && documentVisible;

  useEffect(() => {
    if (!showVideo) return;
    if (!canPlay) {
      videoRefs.current.forEach((video) => video?.pause());
      return;
    }

    const active = videoRefs.current[activeIndex];
    if (!active) return;

    active.muted = true;
    void active.play().catch(() => {
      // Autoplay can be blocked; the poster stays visible.
    });

    // Let the outgoing clip keep moving during the crossfade.
    const pauseTimer = window.setTimeout(() => {
      videoRefs.current.forEach((video, index) => {
        if (index !== activeIndex) video?.pause();
      });
    }, 1200);

    return () => window.clearTimeout(pauseTimer);
  }, [activeIndex, canPlay, showVideo]);

  useEffect(() => {
    if (!canPlay || clips.length < 2) return;

    const timer = window.setInterval(() => {
      if (pendingRef.current !== null) return;
      const next = (activeIndex + 1) % clips.length;
      const video = videoRefs.current[next];
      if (!video) return;

      pendingRef.current = next;
      video.muted = true;

      const reveal = () => {
        if (pendingRef.current !== next) return;
        pendingRef.current = null;
        setReady((previous) => {
          if (previous[next]) return previous;
          const nextReady = [...previous];
          nextReady[next] = true;
          return nextReady;
        });
        setActiveIndex(next);
      };

      if (video.readyState >= 3) {
        reveal();
        return;
      }

      void video
        .play()
        .then(() => {
          if (video.readyState >= 3) reveal();
        })
        .catch(() => {
          if (pendingRef.current === next) pendingRef.current = null;
        });
    }, interval);

    return () => window.clearInterval(timer);
  }, [activeIndex, canPlay, clips.length, interval]);

  const activeClip = clips[activeIndex];

  return (
    <div
      ref={wrapRef}
      className={cn("absolute inset-0 overflow-hidden bg-ink", className)}
    >
      <img
        src={activeClip.poster}
        alt={activeClip.alt}
        width={1440}
        height={810}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          mediaClassName,
        )}
      />

      {showVideo
        ? clips.map((clip, index) => (
            <video
              key={clip.desktopSrc}
              ref={(node) => {
                videoRefs.current[index] = node;
              }}
              muted
              loop
              playsInline
              preload={index === 0 ? "auto" : "metadata"}
              aria-hidden="true"
              tabIndex={-1}
              onCanPlay={() => {
                setReady((previous) => {
                  if (previous[index]) return previous;
                  const nextReady = [...previous];
                  nextReady[index] = true;
                  return nextReady;
                });
                if (pendingRef.current === index) {
                  pendingRef.current = null;
                  setActiveIndex(index);
                }
              }}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
                activeIndex === index && ready[index]
                  ? "opacity-100"
                  : "opacity-0",
                mediaClassName,
              )}
            >
              <source
                media="(max-width: 1023px)"
                src={clip.mobileSrc}
                type="video/mp4"
              />
              <source src={clip.desktopSrc} type="video/mp4" />
            </video>
          ))
        : null}

      <div
        aria-hidden="true"
        className={cn("absolute inset-0", overlayClassName)}
      />

      {showPlaceLabel ? (
        <div className="pointer-events-none absolute right-5 top-24 z-10 flex flex-col items-end gap-2.5 md:right-10 md:top-28">
          <span className="eyebrow flex items-center gap-2 border border-bone/20 bg-ink/45 px-3 py-2 text-[9px] text-bone/85 backdrop-blur-sm">
            <MapPin
              className="size-3 text-gold"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            {activeClip.place}
          </span>
          <span className="flex items-center gap-1.5" aria-hidden="true">
            {clips.map((clip, index) => (
              <span
                key={clip.place}
                className={cn(
                  "h-px transition-all duration-700",
                  activeIndex === index
                    ? "w-7 bg-gold"
                    : "w-3 bg-bone/35",
                )}
              />
            ))}
          </span>
        </div>
      ) : null}
    </div>
  );
}
