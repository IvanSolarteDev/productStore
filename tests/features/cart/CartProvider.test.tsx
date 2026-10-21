import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { CartProvider } from "../../../src/features/cart/CartProvider";
import { useCart } from "../../../src/features/cart/useCart";
import type { CheckoutItem } from "../../../src/features/products/components/modalBuy";

const item: CheckoutItem = {
  id: "control",
  name: "Control",
  image: "/control.png",
  price: 10000,
  quantity: 1,
};

function CartControls() {
  const cart = useCart();
  return (
    <>
      <output aria-label="Cantidad total">{cart.count}</output>
      <button type="button" onClick={() => cart.addItem(item)}>Agregar</button>
      <button type="button" onClick={cart.clear}>Vaciar</button>
    </>
  );
}

describe("CartProvider y useCart", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Verifica que agregar productos calcule correctamente el contador y persista el carrito.
  it("agrega productos y guarda el estado en localStorage", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartControls />
      </CartProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Agregar" }));

    expect(screen.getByLabelText("Cantidad total")).toHaveTextContent("1");
    expect(localStorage.getItem("productStore.cart")).toContain('"name":"Control"');
  });

  // Verifica que agregar el mismo producto sume cantidades en lugar de duplicar líneas.
  it("incrementa la cantidad cuando se agrega el mismo producto", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartControls />
      </CartProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Agregar" }));
    await user.click(screen.getByRole("button", { name: "Agregar" }));

    expect(screen.getByLabelText("Cantidad total")).toHaveTextContent("2");
  });

  // Verifica que el proveedor restaure las líneas y el contador desde localStorage.
  it("recupera el carrito guardado al iniciar", () => {
    localStorage.setItem("productStore.cart", JSON.stringify([{ ...item, quantity: 3 }]));

    render(
      <CartProvider>
        <CartControls />
      </CartProvider>,
    );

    expect(screen.getByLabelText("Cantidad total")).toHaveTextContent("3");
  });

  // Verifica que useCart informe claramente cuando se utiliza sin CartProvider.
  it("lanza un error si se usa fuera de CartProvider", () => {
    function InvalidConsumer() {
      useCart();
      return null;
    }

    expect(() => render(<InvalidConsumer />)).toThrow(
      "useCart debe usarse dentro de <CartProvider>",
    );
  });
});
