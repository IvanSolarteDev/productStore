import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import { MemoryRouter } from "react-router-dom";
import { NotFoundPage } from "../../src/app/NotFoundPage";

describe("NotFoundPage", () => {
  // Verifica que la página de error muestre su mensaje y enlace al catálogo.
  it("muestra el mensaje y permite volver al catálogo", () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Página no encontrada" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Volver al catálogo" })).toHaveAttribute(
      "href",
      "/products",
    );
  });
});
