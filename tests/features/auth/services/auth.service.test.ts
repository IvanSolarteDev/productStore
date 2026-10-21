import { afterEach, describe, expect, it, jest } from "@jest/globals";
import {
  loginService,
  type LoginResponse,
} from "../../../../src/features/auth/services/auth.service";

const validResponse: LoginResponse = {
  id: 1,
  username: "ana",
  email: "ana@example.com",
  firstName: "Ana",
  lastName: "Pérez",
  image: "",
  accessToken: "access-token",
  refreshToken: "refresh-token",
};

describe("loginService", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Verifica que el servicio envíe las credenciales y devuelva una respuesta válida.
  it("envía un POST y devuelve los datos de autenticación", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const fetchSpy = jest.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => validResponse,
    } as Response);
    Object.defineProperty(globalThis, "fetch", {
      configurable: true,
      value: fetchSpy,
    });

    await expect(
      loginService({ username: "ana", password: "secreto" }),
    ).resolves.toEqual(validResponse);

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://dummyjson.com/auth/login",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ username: "ana", password: "secreto" }),
      }),
    );
    consoleSpy.mockRestore();
  });

  // Verifica que una respuesta HTTP fallida produzca un error explícito.
  it("rechaza una respuesta HTTP fallida", async () => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    const fetchMock = jest.fn<typeof fetch>().mockResolvedValue({
      ok: false,
      status: 401,
    } as Response);
    Object.defineProperty(globalThis, "fetch", {
      configurable: true,
      value: fetchMock,
    });

    await expect(loginService({ username: "ana", password: "mal" })).rejects.toThrow(
      "HTTP 401",
    );
  });

  // Verifica que el servicio rechace respuestas exitosas con un formato inválido.
  it("rechaza una respuesta con formato inválido", async () => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    const fetchMock = jest.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({ id: "incorrecto" }),
    } as Response);
    Object.defineProperty(globalThis, "fetch", {
      configurable: true,
      value: fetchMock,
    });

    await expect(loginService({ username: "ana", password: "secreto" })).rejects.toThrow(
      "formato inválido",
    );
  });
});
