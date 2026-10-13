const LOGIN_URL = "https://dummyjson.com/auth/login";

export type LoginCredentials = {
  username: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

function isLoginResponse(value: unknown): value is LoginResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const response = value as Record<string, unknown>;
  return (
    typeof response.id === "number" &&
    typeof response.username === "string" &&
    typeof response.email === "string" &&
    typeof response.firstName === "string" &&
    typeof response.lastName === "string" &&
    typeof response.image === "string" &&
    typeof response.accessToken === "string" &&
    typeof response.refreshToken === "string"
  );
}

export async function loginService(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
    console.log(credentials);
    
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  

  if (!response.ok) {
    throw new Error(`Error al iniciar sesión (HTTP ${response.status}).`);
  }

  const data: unknown = await response.json();
  if (!isLoginResponse(data)) {
    throw new Error("La respuesta del servicio de login tiene un formato inválido.");
  }

  return data;
}