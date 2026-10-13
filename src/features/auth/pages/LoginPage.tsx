
import { Button } from "../../../shared/components/button/button";
import { Checkbox } from "../../../shared/components/checkbok/checkbox";
import { Input } from "../../../shared/components/input/input";
import { PasswordInput } from "../../../shared/components/input/passwordInput";
import { Link } from "../../../shared/components/link/link";
import type { SyntheticEvent } from "react";
import { loginService } from "../services/auth.service";

export function LoginPage() {
  const login = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);


    console.log({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    loginService({
      username: formData.get("email") as string,
      password: formData.get("password") as string,
    }).then((response) => {
      console.log("Login successful:", response);
    }).catch((error) => {
      console.error("Login failed:", error);
    });

  };

  return (
    <section className="flex flex-1 items-center justify-center">
      {/* ///imagen de la derecha */}
      <div
        className="flex w-full items-center justify-center px-4 py-8"
       
      >
        <div className="w-full max-w-md rounded-lg border border-white/20 bg-slate-900/60 shadow-xl backdrop-blur-sm">
          <div className=" rounded-lg  ">
            <div className="p-6  ">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Inicia sesión en tu cuenta
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={login}>
                <div>
                  <Input
                    label="Correo electrónico"
                    classes=" placeholder:text-red-500  "
                    placeholder="Escribe tu correo electrónico"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </div>
                <div>
                  <PasswordInput
                    label="Contraseña"
                    classes=" placeholder:text-red-500  "
                    placeholder="Escribe tu contraseña"
                    name="password"
                    autoComplete="current-password"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start mr-1">
                    <div className="flex items-center h-5">
                      <Checkbox label="Recordarme" />
                    </div>
                  </div>
                  <Link to="/forgot-password" classes="text-lg">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Button />

                <p className="text-sm font-light text-gray-500 dark:text-gray-400  text-center">
                  No tienes una cuenta?{" "}
                  <Link to="/signup" classes="text-lg">
                    Regístrate
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
