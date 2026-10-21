import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import { MemoryRouter } from "react-router-dom";
import { Link } from "../../../../src/shared/components/link/link";

describe("Link", () => {
  // Verifica que el componente navegue a la ruta recibida usando React Router.
  it("renderiza un enlace con la ruta indicada", () => {
    render(
      <MemoryRouter>
        <Link to="/products">Ver productos</Link>
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Ver productos" })).toHaveAttribute(
      "href",
      "/products",
    );
  });
});
