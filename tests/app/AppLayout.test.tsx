import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "@jest/globals";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "../../src/app/AppLayout";
import { CartProvider } from "../../src/features/cart/CartProvider";

describe("AppLayout", () => {
  // Verifica que el layout muestre navegación principal y renderice la ruta hija.
  it("muestra la navegación y el contenido de Outlet", () => {
    render(
      <CartProvider>
        <MemoryRouter initialEntries={["/products"]}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/products" element={<h1>Catálogo de prueba</h1>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </CartProvider>,
    );

    expect(screen.getByRole("link", { name: "ProductStore" })).toHaveAttribute(
      "href",
      "/products",
    );
    expect(screen.getByRole("link", { name: "Iniciar sesión" })).toHaveAttribute(
      "href",
      "/login",
    );
    expect(screen.getByRole("heading", { name: "Catálogo de prueba" })).toBeInTheDocument();
  });

  // Verifica que el botón de carrito abra el resumen aunque no haya artículos.
  it("abre el carrito desde la navegación", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <MemoryRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="*" element={<div>Contenido</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </CartProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Abrir carrito" }));

    expect(screen.getByRole("heading", { name: "Tu carrito" })).toBeInTheDocument();
  });
});
