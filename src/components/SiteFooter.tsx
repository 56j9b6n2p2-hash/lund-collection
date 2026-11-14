import { Link } from "react-router";
import { Instagram } from "lucide-react";
import { Wordmark } from "@/components/Wordmark";

export function SiteFooter({
  cartCount,
  onOpenCart,
}: {
  cartCount: number;
  onOpenCart: () => void;
}) {
  return (
    <footer className="bg-ink text-bone">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Wordmark size="large" />
          <p className="mt-6 max-w-sm text-sm leading-6 text-bone/55">
            Lund merch och julkläder från två 18-åringar i staden. Lokal
            pre-order, egen hemleverans och en julkollektion byggd för Lund i
            vinterskrud.
          </p>
          <p className="eyebrow mt-8 text-[9px] text-bone/50">
            En stad. Ett riktnummer. 046.
          </p>
        </div>

        <nav aria-label="Butik" className="md:col-span-3">
          <p className="eyebrow mb-5 text-bone/55">Butik</p>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/shop"
                className="text-bone/70 transition-colors hover:text-gold"
              >
                Lund merch &amp; julklappar
              </Link>
            </li>
            <li>
              <Link
                to="/shop/domkyrkan-hoodie"
                className="text-bone/70 transition-colors hover:text-gold"
              >
                Lund hoodie · 529 kr
              </Link>
            </li>
            <li>
              <Link
                to="/film"
                className="text-bone/70 transition-colors hover:text-gold"
              >
                Vinter över Lund
              </Link>
            </li>
            <li>
              <Link
                to="/#juldroppet"
                className="text-bone/70 transition-colors hover:text-gold"
              >
                Juldroppet · 1 december
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenCart}
                className="text-bone/70 transition-colors hover:text-gold"
              >
                Varukorg ({cartCount})
              </button>
            </li>
            <li>
              <Link
                to="/#platser"
                className="text-bone/70 transition-colors hover:text-gold"
              >
                Platserna i Lund
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Information" className="md:col-span-2">
          <p className="eyebrow mb-5 text-bone/55">Information</p>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/om-oss"
                className="text-bone/70 transition-colors hover:text-gold"
              >
                Om oss
              </Link>
            </li>
            <li>
              <Link
                to="/kontakt"
                className="text-bone/70 transition-colors hover:text-gold"
              >
                Kontakt
              </Link>
            </li>
            <li>
              <a
                href="https://www.instagram.com/kollektionenavlund.se/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-bone/70 transition-colors hover:text-gold"
              >
                <Instagram className="size-3.5" strokeWidth={1.6} />
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://ig.me/m/kollektionenavlund.se"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bone/70 transition-colors hover:text-gold"
              >
                Skicka DM
              </a>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-2">
          <p className="eyebrow mb-5 text-bone/55">Leverans</p>
          <p className="text-sm leading-6 text-bone/70">
            Personlig hemleverans
            <br />
            av ägarna i Lund
            <br />
            innan jul
          </p>
          <p className="mt-4 text-[10px] tracking-[0.08em] text-bone/55">
            Pre-order · 1 december
          </p>
        </div>
      </div>

      <div className="border-t border-bone/10">
        <div className="container-site flex flex-col gap-2 py-6 text-[11px] text-bone/55 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Kollektionen av Lund</p>
          <p>Julkollektionen 2026 · 046 · Lund</p>
        </div>
      </div>
    </footer>
  );
}
