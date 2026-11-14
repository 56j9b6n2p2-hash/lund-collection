import { useQuery } from "convex/react";
import {
  ArrowLeft,
  KeyRound,
  Loader2,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { Wordmark } from "@/components/Wordmark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { formatSek } from "@/data/products";
import { usePageMeta } from "@/hooks/use-page-meta";

const dateFormatter = new Intl.DateTimeFormat("sv-SE", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatSignupDate(timestamp: number) {
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? "—" : dateFormatter.format(date);
}

function orderReference(id: string) {
  return `LUN-${id.slice(-6).toUpperCase()}`;
}

function orderItemsLabel(items: { name: string; quantity: number }[]) {
  return items
    .map((item) => `${item.quantity} × ${item.name}`)
    .join(", ");
}

function AdminTopBar({ onSignOut }: { onSignOut?: () => void }) {
  return (
    <header className="bg-ink text-bone">
      <div className="container-site flex h-20 items-center justify-between gap-4">
        <Link
          to="/"
          aria-label="Kollektionen av Lund – till startsidan"
          className="shrink-0 py-2 transition-opacity hover:opacity-85"
        >
          <Wordmark />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/"
            aria-label="Till butiken"
            className="eyebrow inline-flex h-10 items-center gap-2 border border-bone/20 px-3 text-bone/70 transition-colors hover:border-gold hover:text-gold sm:px-4"
          >
            <ArrowLeft className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
            <span className="hidden sm:inline">Till butiken</span>
          </Link>
          {onSignOut ? (
            <button
              type="button"
              onClick={onSignOut}
              aria-label="Logga ut"
              className="eyebrow inline-flex h-10 items-center gap-2 bg-gold px-3 text-ink transition-colors hover:bg-bone sm:px-4"
            >
              <LogOut className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
              <span className="hidden sm:inline">Logga ut</span>
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default function Admin() {
  usePageMeta({
    title: "Juldroppet admin | Kollektionen av Lund",
    description:
      "Intern adminpanel för förtursanmälningar och pre-orders till juldroppet.",
    path: "/admin",
    noindex: true,
  });

  const [password, setPassword] = useState("");
  const [submittedPassword, setSubmittedPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const signups = useQuery(
    api.dropSignups.listAdmin,
    submittedPassword ? { password: submittedPassword } : "skip",
  );
  const orders = useQuery(
    api.orders.listAdmin,
    submittedPassword ? { password: submittedPassword } : "skip",
  );

  const isDenied = signups === null || orders === null;
  const isChecking =
    submittedPassword.length > 0 &&
    !isDenied &&
    (signups === undefined || orders === undefined);
  const isSignedIn = Array.isArray(signups) && Array.isArray(orders);
  const signupList = Array.isArray(signups) ? signups : [];
  const orderList = Array.isArray(orders) ? orders : [];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!password.trim()) {
      setFormError("Ange lösenordet för att fortsätta.");
      return;
    }

    setFormError(null);
    setSubmittedPassword(password.trim());
  }

  function handleSignOut() {
    setSubmittedPassword("");
    setPassword("");
    setFormError(null);
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-ink text-bone">
        <AdminTopBar />
        <main className="relative flex min-h-[calc(100svh-5rem)] items-center justify-center overflow-hidden px-5 py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,161,90,0.16),transparent_62%)]"
          />
          <div className="relative w-full max-w-md">
            <div className="rounded-2xl border border-bone/15 bg-bone/[0.045] p-7 shadow-[0_32px_90px_-45px_rgba(0,0,0,0.9)] backdrop-blur-sm md:p-9">
              <span className="flex size-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                <LockKeyhole className="size-5" strokeWidth={1.5} />
              </span>
              <p className="eyebrow mt-7 text-gold">Internt · Juldroppet</p>
              <h1 className="mt-3 text-[clamp(2.8rem,9vw,4.2rem)] leading-[0.86] text-bone">
                Admin<span className="text-gold">.</span>
              </h1>
              <p className="mt-4 text-sm leading-6 text-bone/60">
                Logga in för att se förturslistan och alla pre-orders till
                juldroppet den 1 december.
              </p>

              <form onSubmit={handleSubmit} className="mt-7">
                <label htmlFor="admin-password" className="eyebrow text-bone/60">
                  Lösenord
                </label>
                <div className="relative mt-2.5">
                  <KeyRound
                    className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-bone/35"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <Input
                    id="admin-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    autoFocus
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    aria-invalid={isDenied}
                    aria-describedby={isDenied ? "admin-error" : undefined}
                    placeholder="Ange lösenord"
                    className="h-12 border-bone/20 bg-bone/[0.06] pl-11 text-bone placeholder:text-bone/35 focus-visible:border-gold focus-visible:ring-gold/25"
                  />
                </div>

                {isDenied ? (
                  <p
                    id="admin-error"
                    role="alert"
                    className="mt-2.5 text-xs leading-5 text-[#f1b5a9]"
                  >
                    Fel lösenord. Försök igen.
                  </p>
                ) : formError ? (
                  <p role="alert" className="mt-2.5 text-xs leading-5 text-[#f1b5a9]">
                    {formError}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  disabled={isChecking}
                  className="eyebrow mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold px-5 text-ink transition-colors hover:bg-bone disabled:cursor-wait disabled:opacity-70"
                >
                  {isChecking ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Kontrollerar…
                    </>
                  ) : (
                    "Visa översikt"
                  )}
                </Button>
              </form>

              <p className="mt-5 border-t border-bone/10 pt-4 text-[10px] leading-5 text-bone/40">
                Endast för Kollektionen av Lund. Sidan är undantagen från
                sökmotorer.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-ink">
      <AdminTopBar onSignOut={handleSignOut} />

      <main className="container-site py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="eyebrow flex items-center gap-2.5 text-gold-deep">
              <Users className="size-3.5" strokeWidth={1.6} />
              Juldroppet · 1 december
            </p>
            <h1 className="mt-4 text-[clamp(2.8rem,7vw,5.6rem)] leading-[0.86] text-ink">
              Anmälningar<span className="text-gold-deep">.</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-ink/65">
              Alla som står på förturslistan och alla pre-orders som lagts i
              kassan. Översikten uppdateras direkt när något nytt kommer in.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="min-w-40 rounded-2xl border border-ink/10 bg-card px-6 py-5 shadow-[0_1px_2px_rgba(16,24,32,0.03),0_24px_50px_-40px_rgba(16,24,32,0.35)]">
              <p className="eyebrow text-muted-foreground">På förturslistan</p>
              <p className="mt-2 font-display text-5xl leading-none text-ink">
                {String(signupList.length).padStart(2, "0")}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {signupList.length === 1 ? "anmäld adress" : "anmälda adresser"}
              </p>
            </div>
            <div className="min-w-40 rounded-2xl border border-ink/10 bg-card px-6 py-5 shadow-[0_1px_2px_rgba(16,24,32,0.03),0_24px_50px_-40px_rgba(16,24,32,0.35)]">
              <p className="eyebrow text-muted-foreground">Pre-orders</p>
              <p className="mt-2 font-display text-5xl leading-none text-ink">
                {String(orderList.length).padStart(2, "0")}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {orderList.length === 1 ? "lagd beställning" : "lagda beställningar"}
              </p>
            </div>
          </div>
        </div>

        <section
          aria-labelledby="signup-list-title"
          className="mt-8 overflow-hidden rounded-2xl border border-ink/10 bg-card shadow-[0_1px_2px_rgba(16,24,32,0.03),0_30px_60px_-45px_rgba(16,24,32,0.4)] md:mt-10"
        >
          <div className="flex flex-col gap-4 border-b border-ink/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-6">
            <div>
              <p className="eyebrow text-gold-deep">Juldroppet</p>
              <h2
                id="signup-list-title"
                className="mt-2 font-sans text-lg font-semibold normal-case leading-6 tracking-normal text-ink"
              >
                Alla anmälningar
              </h2>
            </div>
            <span className="w-fit border border-ink/10 bg-sand/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-ink/60">
              Senast först
            </span>
          </div>

          {signupList.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-16 text-center">
              <span className="flex size-14 items-center justify-center rounded-full border border-sand bg-background text-ink/45">
                <Mail className="size-5" strokeWidth={1.5} />
              </span>
              <p className="mt-5 font-display text-2xl leading-none text-ink">
                Ingen på listan ännu.
              </p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                Så snart någon anmäler sig via juldroppet dyker adressen och
                idéen upp här.
              </p>
            </div>
          ) : (
            <Table>
              <caption className="sr-only">
                Anmälningar till juldroppet, sorterade med senaste först.
              </caption>
              <TableHeader>
                <TableRow className="border-ink/10 hover:bg-transparent">
                  <TableHead className="eyebrow h-12 px-5 text-ink/50 md:px-6">
                    E-postadress
                  </TableHead>
                  <TableHead className="eyebrow h-12 px-5 text-ink/50">
                    Källa
                  </TableHead>
                  <TableHead className="eyebrow h-12 px-5 text-ink/50">
                    Idé
                  </TableHead>
                  <TableHead className="eyebrow h-12 px-5 text-right text-ink/50 md:px-6">
                    Anmäld
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {signupList.map((signup) => (
                  <TableRow
                    key={`${signup.email}-${signup.createdAt}`}
                    className="border-ink/10 hover:bg-sand/30"
                  >
                    <TableCell className="min-w-60 whitespace-normal px-5 py-4 md:px-6">
                      <a
                        href={`mailto:${signup.email}`}
                        className="break-all font-medium text-ink transition-colors hover:text-gold-deep"
                      >
                        {signup.email}
                      </a>
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      <span className="inline-flex border border-ink/10 bg-sand/50 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-ink/60">
                        {signup.source}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-xs whitespace-normal px-5 py-4 text-xs leading-5 text-ink/65">
                      {signup.idea || "—"}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-right text-xs tabular-nums text-muted-foreground md:px-6">
                      {formatSignupDate(signup.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </section>

        <section
          aria-labelledby="order-list-title"
          className="mt-8 overflow-hidden rounded-2xl border border-ink/10 bg-card shadow-[0_1px_2px_rgba(16,24,32,0.03),0_30px_60px_-45px_rgba(16,24,32,0.4)] md:mt-10"
        >
          <div className="flex flex-col gap-4 border-b border-ink/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-6">
            <div>
              <p className="eyebrow text-gold-deep">Kassan</p>
              <h2
                id="order-list-title"
                className="mt-2 font-sans text-lg font-semibold normal-case leading-6 tracking-normal text-ink"
              >
                Alla pre-orders
              </h2>
            </div>
            <span className="w-fit border border-ink/10 bg-sand/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-ink/60">
              Senast först
            </span>
          </div>

          {orderList.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-16 text-center">
              <span className="flex size-14 items-center justify-center rounded-full border border-sand bg-background text-ink/45">
                <ShoppingBag className="size-5" strokeWidth={1.5} />
              </span>
              <p className="mt-5 font-display text-2xl leading-none text-ink">
                Inga pre-orders ännu.
              </p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                Så snart någon slutför en pre-order i kassan dyker den upp här.
              </p>
            </div>
          ) : (
            <Table>
              <caption className="sr-only">
                Pre-orders till juldroppet, sorterade med senaste först.
              </caption>
              <TableHeader>
                <TableRow className="border-ink/10 hover:bg-transparent">
                  <TableHead className="eyebrow h-12 px-5 text-ink/50 md:px-6">
                    Kund
                  </TableHead>
                  <TableHead className="eyebrow h-12 px-5 text-ink/50">
                    Plagg
                  </TableHead>
                  <TableHead className="eyebrow h-12 px-5 text-ink/50">
                    Belopp
                  </TableHead>
                  <TableHead className="eyebrow h-12 px-5 text-ink/50">
                    Ordernr
                  </TableHead>
                  <TableHead className="eyebrow h-12 px-5 text-ink/50">
                    Status
                  </TableHead>
                  <TableHead className="eyebrow h-12 px-5 text-right text-ink/50 md:px-6">
                    Lagd
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderList.map((order) => (
                  <TableRow
                    key={order.id}
                    className="border-ink/10 hover:bg-sand/30"
                  >
                    <TableCell className="min-w-52 whitespace-normal px-5 py-4 md:px-6">
                      <p className="font-medium text-ink">{order.customerName}</p>
                      <a
                        href={`mailto:${order.email}`}
                        className="mt-1 block break-all text-xs text-muted-foreground transition-colors hover:text-gold-deep"
                      >
                        {order.email}
                      </a>
                      {order.address ? (
                        <p className="mt-1.5 flex items-start gap-1.5 text-[11px] leading-5 text-muted-foreground">
                          <MapPin
                            className="mt-0.5 size-3 shrink-0 text-gold-deep"
                            strokeWidth={1.7}
                          />
                          <span>{order.address}</span>
                        </p>
                      ) : null}
                    </TableCell>
                    <TableCell className="max-w-xs whitespace-normal px-5 py-4 text-xs leading-5 text-ink/65">
                      {orderItemsLabel(order.items)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-4 text-sm font-semibold tabular-nums text-ink">
                      {formatSek(order.total)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-4 text-xs tracking-wide text-muted-foreground">
                      {orderReference(order.id)}
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      <span className="inline-flex border border-ink/10 bg-sand/50 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-ink/60">
                        {order.status === "confirmed" ? "Bekräftad" : "Ny"}
                      </span>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-right text-xs tabular-nums text-muted-foreground md:px-6">
                      {formatSignupDate(order.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </section>

        <p className="mt-5 text-[11px] leading-5 text-muted-foreground">
          {signupList.length}{" "}
          {signupList.length === 1 ? "anmälan" : "anmälningar"} ·{" "}
          {orderList.length} {orderList.length === 1 ? "pre-order" : "pre-orders"} ·
          endast synligt med adminlösenordet.
        </p>
      </main>
    </div>
  );
}
