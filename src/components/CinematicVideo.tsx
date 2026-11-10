import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

export function CinematicVideo({
  desktopSrc,
  mobileSrc,
  poster,
  alt,
  priority = false,
  className,
  mediaClassName,
  overlayClassName,
  children,
}: {
  desktopSrc: string;
  mobileSrc: string;
  poster: string;
  alt: string;
  priority?: boolean;
  className?: string;
  mediaClassName?: string;
  overlayClassName?: string;
  children?: ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [saveData, setSaveData] = useState(false);

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
    const video = videoRef.current;
    if (!video || !shouldLoad || reduceMotion || saveData) return;
    // Set the property directly so muted playback is never blocked.
    video.muted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            // Autoplay can be blocked; the poster stays visible.
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(video);

    const handleVisibility = () => {
      if (document.hidden) video.pause();
      else if (video.getBoundingClientRect().top < window.innerHeight) {
        void video.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [shouldLoad, reduceMotion, saveData]);

  const showVideo = shouldLoad && !reduceMotion && !saveData;

  return (
    <div
      ref={wrapRef}
      className={cn("absolute inset-0 overflow-hidden bg-ink", className)}
    >
      <img
        src={poster}
        alt={alt}
        width={1440}
        height={900}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          mediaClassName,
        )}
      />
      {showVideo ? (
        <video
          ref={videoRef}
          autoPlay={priority}
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          poster={poster}
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            ready ? "opacity-100" : "opacity-0",
            mediaClassName,
          )}
        >
          <source media="(max-width: 1023px)" src={mobileSrc} type="video/mp4" />
          <source src={desktopSrc} type="video/mp4" />
        </video>
      ) : null}
      <div
        aria-hidden="true"
        className={cn("absolute inset-0", overlayClassName)}
      />
      {children}
    </div>
  );
}
