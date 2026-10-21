import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import { MemoryRouter } from "react-router-dom";
import {
  GenericCard,
  type ProductCardData,
} from "../../../../src/shared/components/card/genericCard";

const product: ProductCardData = {
  id: "control-ps5",
  name: "Control inalámbrico PS5",
  brand: "PlayStation",
  imageUrl: "/control.png",
  imageAlt: "Control negro",
  price: "$ 300.000",
  installmentPlan: "3 cuotas sin interés",
  sales: "+50 vendidos",
  shipping: "Envío gratis",
  badge: "Oferta",
  originalPrice: "$ 350.000",
  discount: "14% OFF",
  rating: "4.9",
};

describe("GenericCard", () => {
  // Verifica que la tarjeta muestre los datos principales del producto y su destino.
  it("muestra información del producto y enlaza a su detalle", () => {
    render(
      <MemoryRouter>
        <GenericCard product={product} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: product.name })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: product.imageAlt })).toHaveAttribute(
      "src",
      product.imageUrl,
    );
    expect(screen.getByText(product.price)).toBeInTheDocument();
    expect(screen.getByText("Oferta")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: `Ver ${product.name}` })).toHaveAttribute(
      "href",
      `/products/${product.id}`,
    );
  });

  // Verifica que los detalles opcionales no se muestren cuando no vienen en el producto.
  it("omite la insignia y la valoración cuando no están definidas", () => {
    const basicProduct: ProductCardData = {
      ...product,
      badge: undefined,
      rating: undefined,
    };
    render(
      <MemoryRouter>
        <GenericCard product={basicProduct} />
      </MemoryRouter>,
    );

    expect(screen.queryByText("Oferta")).not.toBeInTheDocument();
    expect(screen.queryByText("4.9")).not.toBeInTheDocument();
  });
});
