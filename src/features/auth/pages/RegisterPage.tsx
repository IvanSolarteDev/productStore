import type { FormEvent } from "react";
import { Button } from "../../../shared/components/button/button";
import { Input } from "../../../shared/components/input/input";
import { Link } from "../../../shared/components/link/link";

export const RegisterPage = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className="flex flex-1 items-center justify-center">
      <div className="flex w-full items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl rounded-lg border border-white/20 bg-slate-50/45 shadow-xl backdrop-blur-sm">
          <div className="p-6 md:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Crea tu cuenta
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Completa tus datos para registrarte.
            </p>

            <form
              className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
              onSubmit={handleSubmit}
            >
              <Input
                label="Nombre completo"
                placeholder="Escribe tu nombre completo"
                name="fullName"
                type="text"
                autoComplete="name"
                required
              />
              <Input
                label="Fecha de nacimiento"
                name="birthDate"
                type="date"
                autoComplete="bday"
                required
              />
              <Input
                label="Número de celular"
                placeholder="Escribe tu número de celular"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
              />
              <Input
                label="Ubicación (ciudad o municipio)"
                placeholder="Escribe tu ciudad o municipio"
                name="location"
                type="text"
                autoComplete="address-level2"
                required
              />
              <div className="md:col-span-2">
                <Input
                  label="Dirección"
                  placeholder="Escribe tu dirección de residencia"
                  name="address"
                  type="text"
                  autoComplete="street-address"
                  required
                />
              </div>

              <div className="space-y-4 md:col-span-2">
                <Button title="Crear cuenta" />
                <p className="text-center text-sm font-light text-gray-600 dark:text-gray-300">
                  ¿Ya tienes una cuenta?{" "}
                  <Link to="/login" classes="text-base">
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
