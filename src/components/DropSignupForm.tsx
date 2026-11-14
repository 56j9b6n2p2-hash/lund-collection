import { useId, useState } from "react";
import { useMutation } from "convex/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { api } from "@/convex/_generated/api";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function DropSignupForm({ source = "juldroppet" }: { source?: string }) {
  const emailId = `drop-email-${useId().replace(/:/g, "")}`;
  const ideaId = `drop-idea-${useId().replace(/:/g, "")}`;
  const subscribe = useMutation(api.dropSignups.subscribe);
  const [email, setEmail] = useState("");
  const [idea, setIdea] = useState("");
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

    const trimmedIdea = idea.trim();
    setStatus("sending");
    try {
      const result = await subscribe({
        email: email.trim(),
        source,
        idea: trimmedIdea || undefined,
      });
      setMessage(
        result.status === "already"
          ? "Adressen finns redan på listan. Vi hör av oss inför den 1 december."
          : trimmedIdea
            ? "Tack! Din idé är sparad och vi hör av oss inför den 1 december."
            : "Tack! Du står på listan. Vi hör av oss inför den 1 december.",
      );
      setStatus("done");
      setEmail("");
      setIdea("");
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
      <label htmlFor={emailId} className="eyebrow text-bone/60">
        Din e-postadress
      </label>
      <input
        id={emailId}
        type="email"
        name="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="namn@exempel.se"
        className="mt-2.5 h-12 w-full rounded-md border border-bone/20 bg-bone/[0.06] px-4 text-sm text-bone outline-none transition-colors placeholder:text-bone/40 focus:border-gold focus:ring-2 focus:ring-gold/20"
      />

      <label htmlFor={ideaId} className="eyebrow mt-4 block text-bone/60">
        Vilken plats, gata eller detalj i Lund vill du se på nästa plagg?
        <span className="ml-1 font-sans text-[10px] normal-case tracking-normal text-bone/40">
          (frivilligt)
        </span>
      </label>
      <textarea
        id={ideaId}
        name="idea"
        rows={3}
        maxLength={500}
        value={idea}
        onChange={(event) => setIdea(event.target.value)}
        placeholder="T.ex. Mårtenstorget, Klostergården eller en detalj vid Lundsnation"
        className="mt-2.5 w-full resize-none rounded-md border border-bone/20 bg-bone/[0.06] px-4 py-3 text-sm leading-6 text-bone outline-none transition-colors placeholder:text-bone/40 focus:border-gold focus:ring-2 focus:ring-gold/20"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-4 flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl bg-gold px-4 py-3 text-left text-ink shadow-[0_16px_34px_-22px_rgba(201,161,90,0.9)] transition-all hover:-translate-y-0.5 hover:bg-bone disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sparar…
          </>
        ) : (
          <>
            <span>
              <span className="block text-sm font-semibold">
                Få förtur &amp; skicka idé
              </span>
              <span className="mt-0.5 block text-[11px] text-ink/55">
                Kostnadsfritt · vi hör av oss
              </span>
            </span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      {error ? (
        <p role="alert" className="mt-2.5 text-xs leading-5 text-[#f1b5a9]">
          {error}
        </p>
      ) : null}
      <p className="mt-3 text-[10px] leading-5 text-bone/55">
        Vi använder adressen endast för att höra av oss inför juldroppet. Inga
        nyhetsbrev, inget krångel.
      </p>
    </form>
  );
}
