import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "@jest/globals";
import { Checkbox } from "../../../../src/shared/components/checkbok/checkbox";

describe("Checkbox", () => {
  // Verifica que la etiqueta identifique el checkbox y que pueda marcarse.
  it("muestra su etiqueta y permite marcarse", async () => {
    const user = userEvent.setup();
    render(<Checkbox id="remember" label="Recordarme" />);
    const checkbox = screen.getByRole("checkbox", { name: "Recordarme" });

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  // Verifica que se transmitan al input las propiedades estándar recibidas.
  it("conserva las propiedades del input", () => {
    render(<Checkbox aria-label="Acepto términos" required />);

    expect(screen.getByRole("checkbox", { name: "Acepto términos" })).toBeRequired();
  });
});
