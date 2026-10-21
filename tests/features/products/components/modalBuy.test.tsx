import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, jest } from "@jest/globals";
import { ModalBuy, type CheckoutItem } from "../../../../src/features/products/components/modalBuy";

const items: CheckoutItem[] = [
  {
    id: "control",
    name: "Control inalámbrico",
    image: "/control.png",
    price: 10000,
    quantity: 1,
  },
];

describe("ModalBuy", () => {
  // Verifica que el resumen muestre el producto, el total y el título apropiado.
  it("muestra el resumen de compra y su total", () => {
    render(<ModalBuy isOpen onClose={jest.fn()} items={items} />);

    expect(screen.getByRole("heading", { name: "Comprar ahora" })).toBeInTheDocument();
    expect(screen.getByText("Control inalámbrico")).toBeInTheDocument();
    expect(screen.getAllByText(/10\.000/)).toHaveLength(3);
  });

  // Verifica que aumentar la cantidad actualice la cantidad y el callback onChange.
  it("actualiza la cantidad y notifica el cambio", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<ModalBuy isOpen onClose={jest.fn()} items={items} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Agregar una unidad" }));

    expect(screen.getByText("2", { selector: "span" })).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith([{ ...items[0], quantity: 2 }]);
  });

  // Verifica que la cantidad no pueda bajar de una unidad al usar el control de decremento.
  it("no permite reducir la cantidad por debajo de uno", async () => {
    const user = userEvent.setup();
    render(<ModalBuy isOpen onClose={jest.fn()} items={items} />);

    await user.click(screen.getByRole("button", { name: "Quitar una unidad" }));

    expect(screen.getByText("1", { selector: "span" })).toBeInTheDocument();
  });

  // Verifica que se pueda quitar un producto y se informe la lista actualizada.
  it("elimina un producto del resumen", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<ModalBuy isOpen onClose={jest.fn()} items={items} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Eliminar producto" }));

    expect(screen.getByText("No hay productos para comprar.")).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith([]);
  });

  // Verifica que continuar envíe las líneas de compra y cierre la modal.
  it("confirma la compra y llama a onClose", async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();
    const onClose = jest.fn();
    render(
      <ModalBuy
        isOpen
        onClose={onClose}
        items={items}
        onConfirm={onConfirm}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Continuar al pago" }));

    expect(onConfirm).toHaveBeenCalledWith(items);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // Verifica que el botón de pago quede desactivado cuando no hay productos.
  it("desactiva continuar al pago con el carrito vacío", () => {
    render(<ModalBuy isOpen onClose={jest.fn()} items={[]} />);

    expect(screen.getByRole("button", { name: "Continuar al pago" })).toBeDisabled();
  });
});
