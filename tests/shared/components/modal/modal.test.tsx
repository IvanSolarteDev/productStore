import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, jest } from "@jest/globals";
import { Modal } from "../../../../src/shared/components/modal/modal";

describe("Modal", () => {
  // Verifica que al estar cerrada no se rendericen el contenido ni el portal.
  it("no renderiza su contenido cuando está cerrada", () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()}>
        Contenido privado
      </Modal>,
    );

    expect(screen.queryByText("Contenido privado")).not.toBeInTheDocument();
  });

  // Verifica que al abrirse se monte en el documento y el botón de cierre llame onClose.
  it("renderiza el contenido y permite cerrar con el botón", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(
      <Modal isOpen onClose={onClose}>
        Contenido modal
      </Modal>,
    );

    expect(screen.getByText("Contenido modal")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "✕" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // Verifica que un clic dentro del contenido no burbujee al fondo que cierra la modal.
  it("no cierra al hacer clic en el contenido interno", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <button type="button">Acción interna</button>
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "Acción interna" }));

    expect(onClose).not.toHaveBeenCalled();
  });
});
