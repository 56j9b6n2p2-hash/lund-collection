import { cn } from "@/lib/utils";

const RAYS: Array<[number, number, number]> = [
  [120, 26, 0.9],
  [186, 54, 0.45],
  [214, 120, 0.8],
  [186, 186, 0.45],
  [120, 214, 0.9],
  [54, 186, 0.45],
  [26, 120, 0.8],
  [54, 54, 0.45],
];

/** A quiet, hanging Christmas star for the top of the hero. */
export function ChristmasStar({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("christmas-star pointer-events-none", className)}
    >
      <svg viewBox="0 0 240 240" fill="none" className="h-full w-full">
        <defs>
          <radialGradient
            id="christmas-star-glow"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor="#f3ede2" stopOpacity="0.45" />
            <stop offset="38%" stopColor="#c9a15a" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#c9a15a" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="christmas-star-ray"
            x1="120"
            y1="26"
            x2="120"
            y2="214"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f3ede2" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#c9a15a" stopOpacity="0.65" />
            <stop offset="1" stopColor="#c9a15a" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <circle cx="120" cy="120" r="112" fill="url(#christmas-star-glow)" />

        {RAYS.map(([x, y, opacity], index) => (
          <line
            key={index}
            x1="120"
            y1="120"
            x2={x}
            y2={y}
            stroke="url(#christmas-star-ray)"
            strokeWidth={index % 2 === 0 ? 1.1 : 0.55}
            strokeOpacity={opacity}
            strokeLinecap="round"
          />
        ))}

        <path
          d="M120 64 L128.5 111.5 L176 120 L128.5 128.5 L120 176 L111.5 128.5 L64 120 L111.5 111.5 Z"
          fill="#f3ede2"
          fillOpacity="0.92"
        />
        <circle cx="120" cy="120" r="4.5" fill="#fffaf0" />
        <circle
          cx="120"
          cy="120"
          r="15"
          stroke="#c9a15a"
          strokeOpacity="0.45"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}
