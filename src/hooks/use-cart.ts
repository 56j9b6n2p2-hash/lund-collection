import { useCallback, useEffect, useMemo, useState } from "react";
import { getProduct, products } from "@/data/products";

export type CartLine = { id: string; qty: number };
export type PlacedOrder = {
  reference: string;
  email: string;
  address: string;
  total: number;
  itemCount: number;
};

const STORAGE_KEY = "kollektionen-lund-cart-v1";
const MAX_QTY = 9;

function readStoredCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const result: CartLine[] = [];
    const seen = new Set<string>();
    for (const entry of parsed) {
      if (!entry || typeof entry !== "object") continue;
      const { id, qty } = entry as { id?: unknown; qty?: unknown };
      if (typeof id !== "string" || !getProduct(id) || seen.has(id)) continue;
      if (typeof qty !== "number" || !Number.isInteger(qty)) continue;
      const safeQty = Math.min(MAX_QTY, Math.max(1, qty));
      seen.add(id);
      result.push({ id, qty: safeQty });
    }
    return result;
  } catch {
    return [];
  }
}

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>(readStoredCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage may be unavailable (private mode); the cart still works in memory.
    }
  }, [lines]);

  const addItem = useCallback((id: string, qty = 1) => {
    if (!getProduct(id)) return;
    setLines((current) => {
      const existing = current.find((line) => line.id === id);
      if (existing) {
        return current.map((line) =>
          line.id === id
            ? { ...line, qty: Math.min(MAX_QTY, line.qty + qty) }
            : line,
        );
      }
      return [...current, { id, qty: Math.min(MAX_QTY, Math.max(1, qty)) }];
    });
  }, []);

  const decrement = useCallback((id: string) => {
    setLines((current) =>
      current.flatMap((line) => {
        if (line.id !== id) return [line];
        return line.qty > 1 ? [{ ...line, qty: line.qty - 1 }] : [];
      }),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setLines((current) => current.filter((line) => line.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const detailed = useMemo(
    () =>
      lines.flatMap((line) => {
        const product = getProduct(line.id);
        return product ? [{ ...line, product }] : [];
      }),
    [lines],
  );

  const count = useMemo(
    () => lines.reduce((total, line) => total + line.qty, 0),
    [lines],
  );

  const subtotal = useMemo(
    () =>
      detailed.reduce(
        (total, line) => total + line.product.price * line.qty,
        0,
      ),
    [detailed],
  );

  return {
    lines,
    detailed,
    count,
    subtotal,
    addItem,
    decrement,
    removeItem,
    clear,
    products,
  };
}

export type CartApi = ReturnType<typeof useCart>;
