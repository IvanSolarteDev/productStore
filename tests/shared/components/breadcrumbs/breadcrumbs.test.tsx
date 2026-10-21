import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Breadcrumbs } from "../../../../src/shared/components/breadcrumbs/breadcrumbs";

const renderAtPath = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="*" element={<Breadcrumbs />} />
      </Routes>
    </MemoryRouter>,
  );

describe("Breadcrumbs", () => {
  // Verifica que las migas no aparezcan en la página principal del catálogo.
  it("no muestra la ruta en /products", () => {
    renderAtPath("/products");

    expect(screen.queryByRole("navigation", { name: "Ruta" })).not.toBeInTheDocument();
  });

  // Verifica que los segmentos se decodifiquen y que los antecesores sean enlaces.
  it("muestra los segmentos de una ruta y enlaza sus antecesores", () => {
    renderAtPath("/products/control%20ps5");

    expect(screen.getByRole("navigation", { name: "Ruta" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "products" })).toHaveAttribute(
      "href",
      "/products",
    );
    expect(screen.getByText("control ps5")).toBeInTheDocument();
  });
});
