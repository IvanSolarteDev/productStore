import { render, screen } from "@testing-library/react";
import { describe, expect, it, jest } from "@jest/globals";
import { OpenImage } from "../../../../src/features/products/components/openImage";

describe("OpenImage", () => {
  // Verifica que la imagen se muestre en la modal abierta con su texto alternativo.
  it("muestra la imagen cuando isOpen es verdadero", () => {
    render(<OpenImage isOpen onClose={jest.fn()} />);

    expect(
      screen.getByRole("img", { name: "Control PlayStation DualSense" }),
    ).toBeInTheDocument();
  });

  // Verifica que no aparezca contenido cuando la modal de imagen está cerrada.
  it("no muestra la imagen cuando isOpen es falso", () => {
    render(<OpenImage isOpen={false} onClose={jest.fn()} />);

    expect(
      screen.queryByRole("img", { name: "Control PlayStation DualSense" }),
    ).not.toBeInTheDocument();
  });
});
