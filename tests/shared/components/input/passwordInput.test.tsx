import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "@jest/globals";
import { PasswordInput } from "../../../../src/shared/components/input/passwordInput";

describe("PasswordInput", () => {
  // Verifica que la contraseña inicie oculta y el control ofrezca mostrarla.
  it("inicia con la contraseña oculta", () => {
    render(<PasswordInput label="Contraseña" />);

    expect(screen.getByLabelText("Contraseña")).toHaveAttribute("type", "password");
    expect(screen.getByRole("button", { name: "Mostrar contraseña" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  // Verifica que el botón alterne entre mostrar y ocultar el valor de la contraseña.
  it("alterna la visibilidad de la contraseña", async () => {
    const user = userEvent.setup();
    render(<PasswordInput label="Contraseña" />);

    await user.click(screen.getByRole("button", { name: "Mostrar contraseña" }));
    expect(screen.getByLabelText("Contraseña")).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: "Ocultar contraseña" }));
    expect(screen.getByLabelText("Contraseña")).toHaveAttribute("type", "password");
  });
});
