import { render, screen } from "@testing-library/react";
import { describe, expect, it, jest } from "@jest/globals";
import App from "../src/App";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  RouterProvider: () => <div>Rutas montadas</div>,
}));

describe("App", () => {
  // Verifica que la aplicación monte el proveedor del carrito y renderice el router.
  it("renderiza el proveedor principal y el router", () => {
    render(<App />);

    expect(screen.getByText("Rutas montadas")).toBeInTheDocument();
  });
});
