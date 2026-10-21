import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useCart } from "../features/cart/useCart";
import { ModalBuy } from "../features/products/components/modalBuy";
import backgroundImage from "../assets/imagen/logo_login.jpg";
import { Breadcrumbs } from "../shared/components/breadcrumbs/breadcrumbs";

export function AppLayout() {
  const { items, count, setItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

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
            <div className="">
              <Link className="text-lg font-semibold" to="/products">
                ProductStore
              </Link>
            </div>
            <div>
              <button
                type="button"
                aria-label="Abrir carrito"
                onClick={() => setIsCartOpen(true)}
                className="relative mx-4 align-middle text-sm font-medium hover:text-slate-950"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                {count > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs text-white">
                    {count}
                  </span>
                )}
              </button>

              <Link
                className="text-sm font-medium hover:text-slate-950"
                to="/login"
              >
                Iniciar sesión
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto flex w-full  flex-1 flex-col  md:px-32">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>

      <ModalBuy
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        title="Tu carrito"
        onChange={setItems}
      />
    </>
  );
}
