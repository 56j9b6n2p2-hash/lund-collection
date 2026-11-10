import { useId, useState } from "react";
import { useMutation } from "convex/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { api } from "@/convex/_generated/api";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function DropSignupForm({ source = "juldroppet" }: { source?: string }) {
  const inputId = `drop-email-${useId().replace(/:/g, "")}`;
  const subscribe = useMutation(api.dropSignups.subscribe);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!emailPattern.test(email.trim())) {
      setError("Ange en giltig e-postadress.");
      return;
    }

    setStatus("sending");
    try {
      const result = await subscribe({ email: email.trim(), source });
      setMessage(
        result.status === "already"
          ? "Adressen finns redan på listan. Vi hör av oss inför den 1 december."
          : "Vi hör av oss inför den 1 december med allt du behöver veta.",
      );
      setStatus("done");
      setEmail("");
    } catch {
      setError("Något gick fel. Försök igen om en stund.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="mt-6 rounded-xl border border-gold/30 bg-gold/10 p-4"
      >
        <div className="flex gap-3">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
            <Check className="size-4" strokeWidth={2} />
          </span>
          <div>
            <p className="text-sm font-semibold text-bone">
              Du står på listan.
            </p>
            <p className="mt-1 text-xs leading-5 text-bone/65">{message}</p>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setMessage("");
              }}
              className="mt-3 text-[11px] text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold-soft"
            >
              Anmäl en annan adress
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <label htmlFor={inputId} className="eyebrow text-bone/60">
        Din e-postadress
      </label>
      <div className="mt-2.5 flex flex-col gap-2 sm:flex-row">
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="namn@exempel.se"
          className="h-12 min-w-0 flex-1 rounded-md border border-bone/20 bg-bone/[0.06] px-4 text-sm text-bone outline-none transition-colors placeholder:text-bone/40 focus:border-gold focus:ring-2 focus:ring-gold/20"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="eyebrow flex h-12 shrink-0 items-center justify-center gap-2 bg-gold px-5 text-ink transition-colors hover:bg-bone disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sparar…
            </>
          ) : (
            <>
              Stå på listan
              <ArrowRight className="size-3.5" />
            </>
          )}
        </button>
      </div>
      {error ? (
        <p role="alert" className="mt-2.5 text-xs leading-5 text-[#f1b5a9]">
          {error}
        </p>
      ) : null}
      <p className="mt-3 text-[10px] leading-5 text-bone/55">
        Vi använder adressen endast för att höra av oss inför juldroppet.
        Inga nyhetsbrev, inget krångel.
      </p>
    </form>
  );
}
