import { Link, Outlet } from "react-router-dom";
import backgroundImage from "../assets/imagen/logo_login.jpg";

export function AppLayout() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <div className="relative z-10 flex min-h-screen flex-col bg-slate-900/30 backdrop-blur-sm">
        <header className="border-b border-slate-600 *:bg-slate-900/30 backdrop-blur-sm w-full">
          <nav className="mx-auto flex items-center justify-between px-6 py-4 text-slate-200 ">
            <div className="border">
              <Link className="text-lg font-semibold" to="/products">
                ProductStore
              </Link>
            </div>
            <div>
              <Link
                className="text-sm font-medium hover:text-slate-950"
                to="/login"
              >
                Iniciar sesión
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
          <Outlet />
        </main>
      </div>
    </>
  );
}
