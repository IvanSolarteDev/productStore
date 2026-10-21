import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "@jest/globals";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "../../../../src/features/cart/CartProvider";
import { useCart } from "../../../../src/features/cart/useCart";
import { ProductDetailPage } from "../../../../src/features/products/pages/ProductDetailPage";

function CartCount() {
  const { count } = useCart();
  return <output aria-label="Productos en el carrito">{count}</output>;
}

const renderProduct = () =>
  render(
    <CartProvider>
      <MemoryRouter initialEntries={["/products/control-ps5"]}>
        <Routes>
          <Route path="/products/:productId" element={<ProductDetailPage />} />
        </Routes>
      </MemoryRouter>
      <CartCount />
    </CartProvider>,
  );

describe("ProductDetailPage", () => {
  // Verifica que la página muestre el producto correspondiente al parámetro de ruta.
  it("muestra el producto y el identificador de la ruta", () => {
    renderProduct();

    expect(
      screen.getByRole("heading", {
        name: /Control Inalámbrico PlayStation DualSense Galactic Purple.*control-ps5/,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Lo que tienes que saber de este producto")).toBeInTheDocument();
  });

  // Verifica que el botón para agregar al carrito actualice el contador compartido.
  it("agrega el producto al carrito", async () => {
    const user = userEvent.setup();
    renderProduct();

    await user.click(screen.getByRole("button", { name: "Agregar al carrito" }));

    expect(screen.getByLabelText("Productos en el carrito")).toHaveTextContent("1");
  });

  // Verifica que la compra inmediata abra el resumen con el producto actual.
  it("abre el resumen al seleccionar comprar ahora", async () => {
    const user = userEvent.setup();
    renderProduct();

    await user.click(screen.getByRole("button", { name: "Comprar ahora" }));

    expect(screen.getByRole("heading", { name: "Comprar ahora" })).toBeInTheDocument();
  });

  // Verifica que seleccionar la imagen abra la vista ampliada.
  it("abre la imagen ampliada al seleccionar la imagen principal", async () => {
    const user = userEvent.setup();
    renderProduct();

    await user.click(screen.getByRole("button", { name: "Control PlayStation DualSense" }));

    expect(
      screen.getAllByRole("img", { name: "Control PlayStation DualSense" }),
    ).toHaveLength(2);
  });
});
