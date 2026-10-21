import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import { MemoryRouter } from "react-router-dom";
import { RegisterPage } from "../../../../src/features/auth/pages/RegisterPage";

describe("RegisterPage", () => {
  // Verifica que el formulario muestre todos los campos obligatorios de registro.
  it("muestra los campos personales y de dirección", () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Crea tu cuenta" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Nombre completo" })).toBeRequired();
    expect(screen.getByLabelText("Fecha de nacimiento")).toBeRequired();
    expect(screen.getByRole("textbox", { name: "Número de celular" })).toHaveAttribute(
      "type",
      "tel",
    );
    expect(
      screen.getByRole("textbox", { name: "Ubicación (ciudad o municipio)" }),
    ).toBeRequired();
    expect(screen.getByRole("textbox", { name: "Dirección" })).toBeRequired();
    expect(screen.getByRole("button", { name: "Crear cuenta" })).toBeInTheDocument();
  });

  // Verifica que el enlace de regreso lleve al formulario de inicio de sesión.
  it("ofrece un enlace para iniciar sesión", () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Inicia sesión" })).toHaveAttribute(
      "href",
      "/login",
    );
  });
});
