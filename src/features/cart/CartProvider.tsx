import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CheckoutItem } from "../products/components/modalBuy";
import { CartContext } from "./useCart";

const STORAGE_KEY = "productStore.cart";

// localStorage puede fallar (modo privado, datos bloqueados): el carrito sigue funcionando en memoria
const loadCart = (): CheckoutItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CheckoutItem[]) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CheckoutItem[]>(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // sin persistencia
    }
  }, [items]);

  // useMemo: el value solo cambia cuando cambia el carrito, no en cada render
  const value = useMemo(
    () => ({
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      addItem: (item: CheckoutItem) =>
        setItems((prev) =>
          prev.some((i) => i.id === item.id)
            ? prev.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              )
            : [...prev, item],
        ),
      setItems,
      clear: () => setItems([]),
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
