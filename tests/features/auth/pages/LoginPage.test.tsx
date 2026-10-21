import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../../src/features/auth/pages/LoginPage";
import { loginService } from "../../../../src/features/auth/services/auth.service";

jest.mock("../../../../src/features/auth/services/auth.service", () => ({
  loginService: jest.fn(),
}));

const mockLoginService = jest.mocked(loginService);

describe("LoginPage", () => {
  beforeEach(() => {
    mockLoginService.mockResolvedValue({
      id: 1,
      username: "ana",
      email: "ana@example.com",
      firstName: "Ana",
      lastName: "Pérez",
      image: "",
      accessToken: "access-token",
      refreshToken: "refresh-token",
    });
  });

  // Verifica que se muestren los campos obligatorios y los enlaces de acceso.
  it("renderiza el formulario de inicio de sesión", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Inicia sesión en tu cuenta" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Correo electrónico" })).toBeRequired();
    expect(screen.getByLabelText("Contraseña")).toBeRequired();
    expect(screen.getByRole("link", { name: "¿Olvidaste tu contraseña?" })).toHaveAttribute(
      "href",
      "/forgot-password",
    );
  });

  // Verifica que al enviar el formulario se envíen el correo y la contraseña al servicio.
  it("envía las credenciales al servicio de autenticación", async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByRole("textbox", { name: "Correo electrónico" }), "ana@example.com");
    await user.type(screen.getByLabelText("Contraseña"), "secreto123");
    await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    await waitFor(() => {
      expect(mockLoginService).toHaveBeenCalledWith({
        username: "ana@example.com",
        password: "secreto123",
      });
    });
    consoleSpy.mockRestore();
  });
});
