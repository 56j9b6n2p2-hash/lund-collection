import { cn } from "@/lib/utils";

/**
 * Three parallax layers of CSS snow. Kept purely decorative so the film and
 * copy stay the focus, and paused automatically for reduced-motion users.
 */
export function Snowfall({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "snowfall pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <span className="snowfall-layer snowfall-layer-far" />
      <span className="snowfall-layer snowfall-layer-mid" />
      <span className="snowfall-layer snowfall-layer-near" />
    </div>
  );
}
