import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import { MemoryRouter } from "react-router-dom";
import { ProductListPage } from "../../../../src/features/products/pages/ProductListPage";
import { mockProducts } from "../../../../src/shared/mock/products";

describe("ProductListPage", () => {
  // Verifica que el catálogo muestre su encabezado y todas las tarjetas de producto.
  it("muestra el catálogo y el total de productos", () => {
    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Controles para PS5" })).toBeInTheDocument();
    expect(screen.getByText(`${mockProducts.length} productos`)).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(mockProducts.length);
  });
});
