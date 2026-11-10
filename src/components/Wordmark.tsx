import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  size = "default",
}: {
  className?: string;
  size?: "default" | "large";
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-col items-start leading-none",
        className,
      )}
    >
      <span
        className={cn(
          "font-display uppercase text-gold",
          size === "large"
            ? "text-[clamp(1.9rem,4.5vw,3rem)]"
            : "text-[19px] md:text-[22px]",
        )}
        style={{ letterSpacing: "0.015em" }}
      >
        Kollektionen
      </span>
      <span
        className={cn(
          "mt-1 flex items-center gap-2 font-sans font-semibold uppercase text-gold/85",
          size === "large"
            ? "text-[10px] tracking-[0.5em]"
            : "text-[8px] tracking-[0.42em] md:text-[9px]",
        )}
      >
        <span
          aria-hidden="true"
          className="h-px w-4 bg-gold/50 md:w-5"
        />
        av Lund
      </span>
    </span>
  );
}
