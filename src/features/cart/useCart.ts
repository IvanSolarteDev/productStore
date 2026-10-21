import { createContext, useContext } from "react";
import type { CheckoutItem } from "../products/components/modalBuy";

export type CartContextValue = {
  items: CheckoutItem[];
  count: number;
  addItem: (item: CheckoutItem) => void;
  setItems: (items: CheckoutItem[]) => void;
  clear: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return context;
};
