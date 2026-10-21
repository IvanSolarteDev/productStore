import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, jest } from "@jest/globals";
import { Button } from "../../../../src/shared/components/button/button";

describe("Button", () => {
  // Verifica que el botón use su texto predeterminado cuando no se proporciona un título.
  it("muestra el título predeterminado", () => {
    render(<Button />);

    expect(screen.getByRole("button", { name: "Iniciar sesión" })).toBeInTheDocument();
  });

  // Verifica que se muestre un título personalizado y se ejecute el callback al hacer clic.
  it("muestra el título personalizado y ejecuta onClick", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button title="Comprar ahora" onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Comprar ahora" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // Verifica que la variante secundaria aplique sus clases visuales.
  it("aplica los estilos de la variante secundaria", () => {
    render(<Button title="Agregar al carrito" variant="secondary" />);

    expect(screen.getByRole("button", { name: "Agregar al carrito" })).toHaveClass(
      "text-blue-600",
    );
  });
});
