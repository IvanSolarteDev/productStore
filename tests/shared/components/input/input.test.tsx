import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "@jest/globals";
import { Input } from "../../../../src/shared/components/input/input";

describe("Input", () => {
  // Verifica que la etiqueta quede asociada al campo y se conserven sus atributos.
  it("asocia la etiqueta y conserva las propiedades del input", () => {
    render(
      <Input
        label="Correo electrónico"
        name="email"
        type="email"
        placeholder="Escribe tu correo"
      />,
    );
    const input = screen.getByRole("textbox", { name: "Correo electrónico" });

    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("placeholder", "Escribe tu correo");
  });

  // Verifica que el usuario pueda escribir en el campo de texto.
  it("permite ingresar texto", async () => {
    const user = userEvent.setup();
    render(<Input label="Nombre" />);
    const input = screen.getByRole("textbox", { name: "Nombre" });

    await user.type(input, "Ana");

    expect(input).toHaveValue("Ana");
  });
});
