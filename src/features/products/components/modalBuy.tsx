import { useState } from "react";
import { Modal, type ModalProps } from "../../../shared/components/modal/modal";

export type CheckoutItem = {
  id: string | number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type ModalBuyProps = Omit<ModalProps, "children"> & {
  items: CheckoutItem[];
  title?: string;
  onConfirm?: (items: CheckoutItem[]) => void;
  /** Se llama cada vez que cambia una cantidad o se quita un producto */
  onChange?: (items: CheckoutItem[]) => void;
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

type SummaryProps = Pick<
  ModalBuyProps,
  "items" | "title" | "onConfirm" | "onChange"
> & {
  onClose: () => void;
};

// Vive dentro del Modal, que no renderiza hijos cerrado: el estado se reinicia al abrir
const BuySummary = ({
  items,
  title,
  onConfirm,
  onChange,
  onClose,
}: SummaryProps) => {
  const [lines, setLines] = useState(items);

  const heading = title ?? (items.length > 1 ? "Tu carrito" : "Comprar ahora");
  const total = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);

  const update = (next: CheckoutItem[]) => {
    setLines(next);
    onChange?.(next);
  };

  const changeQuantity = (id: CheckoutItem["id"], delta: number) =>
    update(
      lines.map((l) =>
        l.id === id ? { ...l, quantity: Math.max(1, l.quantity + delta) } : l,
      ),
    );

  const remove = (id: CheckoutItem["id"]) =>
    update(lines.filter((l) => l.id !== id));

  const confirm = () => {
    onConfirm?.(lines);
    onClose();
  };

  return (
    <div className="w-[90vw] max-w-lg bg-slate-100/80 p-6">
      <h2 className="pr-10 text-xl font-semibold text-slate-800">{heading}</h2>

      {lines.length === 0 ? (
        <p className="py-10 text-center text-slate-500">
          No hay productos para comprar.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {lines.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 shrink-0 rounded-lg object-contain"
              />

              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-medium text-slate-800">
                  {item.name}
                </p>
                <p className="text-xs text-slate-500">
                  {formatPrice(item.price)} c/u
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm">
                  <button
                    type="button"
                    aria-label="Quitar una unidad"
                    onClick={() => changeQuantity(item.id, -1)}
                    className="h-6 w-6 rounded-full border border-slate-300 hover:bg-slate-100"
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    type="button"
                    aria-label="Agregar una unidad"
                    onClick={() => changeQuantity(item.id, 1)}
                    className="h-6 w-6 rounded-full border border-slate-300 hover:bg-slate-100"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    aria-label="Eliminar producto"
                    onClick={() => remove(item.id)}
                    className="ml-1 flex h-6 w-6 items-center justify-center rounded-full text-slate-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <span className="material-symbols-outlined text-lg">
                      delete
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <p className="font-semibold text-slate-800">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-col gap-1 border-t border-slate-200 pt-4 text-sm text-slate-600">
        <div className="flex justify-between">
          <span>Envío</span>
          <span className="text-green-600">Gratis</span>
        </div>
        <div className="flex justify-between text-base font-semibold text-slate-800">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={confirm}
          disabled={lines.length === 0}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
        >
          Continuar al pago
        </button>
      </div>
    </div>
  );
};

export const ModalBuy = ({
  isOpen,
  onClose,
  items,
  title,
  onConfirm,
  onChange,
}: ModalBuyProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <BuySummary
        items={items}
        title={title}
        onConfirm={onConfirm}
        onChange={onChange}
        onClose={onClose}
      />
    </Modal>
  );
};
