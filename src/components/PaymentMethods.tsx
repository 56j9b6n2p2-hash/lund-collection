import { cn } from "@/lib/utils";

function KlarnaMark() {
  return (
    <span
      aria-hidden="true"
      className="rounded-md bg-[#ffb3c7] px-2 py-1 text-[12px] font-bold leading-none tracking-[-0.03em] text-[#17120f]"
    >
      Klarna.
    </span>
  );
}

function CardMark() {
  return (
    <span aria-hidden="true" className="flex items-center gap-2">
      <span className="text-[13px] font-extrabold italic leading-none tracking-[-0.04em] text-[#1a1f71]">
        VISA
      </span>
      <span className="relative flex h-4 w-7 items-center">
        <span className="absolute left-0 size-4 rounded-full bg-[#eb001b]" />
        <span className="absolute right-0 size-4 rounded-full bg-[#f79e1b] mix-blend-multiply" />
      </span>
    </span>
  );
}

function AmazonPayMark() {
  return (
    <span aria-hidden="true" className="relative flex items-baseline gap-1">
      <span className="text-[13px] font-semibold leading-none tracking-[-0.05em] text-[#111111]">
        amazon
      </span>
      <span className="text-[13px] font-semibold leading-none tracking-[-0.04em] text-[#ff9900]">
        pay
      </span>
      <svg
        viewBox="0 0 14 5"
        className="absolute -bottom-1.5 left-7 h-1.5 w-3.5 text-[#ff9900]"
        fill="none"
      >
        <path
          d="M1 1.1c2.6 2.1 7.4 2.4 11.4.6"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="m10.8 1.1 2.1.3-.8 1.8"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ApplePayMark() {
  return (
    <span
      aria-hidden="true"
      className="flex items-center gap-1.5 text-[#111111]"
    >
      <svg viewBox="0 0 24 24" className="size-4 fill-current">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z" />
      </svg>
      <span className="text-[14px] font-semibold leading-none tracking-[-0.04em]">
        Pay
      </span>
    </span>
  );
}

const methods = [
  { name: "Klarna", mark: <KlarnaMark /> },
  { name: "Kort", mark: <CardMark /> },
  { name: "Amazon Pay", mark: <AmazonPayMark /> },
  { name: "Apple Pay", mark: <ApplePayMark /> },
];

export function PaymentMethods({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-sand/90 bg-white/55 p-3.5",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow text-[9px] text-ink/50">Betala med</p>
        <span className="text-[9px] font-medium text-ink/40">
          Säkert via Stripe
        </span>
      </div>
      <ul className="mt-2.5 grid grid-cols-2 gap-2">
        {methods.map((method) => (
          <li
            key={method.name}
            title={method.name}
            className="flex h-11 items-center justify-center rounded-xl border border-ink/10 bg-white px-3 shadow-[0_1px_2px_rgba(16,24,32,0.04)]"
          >
            {method.mark}
            <span className="sr-only">{method.name}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-center text-[9px] leading-4 text-muted-foreground">
        Betalsättet väljs i Stripe-kassan.
      </p>
    </div>
  );
}
