import { Link, useLocation } from "react-router-dom";

export const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  // En la página de inicio (/products) no hay nada que mostrar
  if (segments.length <= 1 && segments[0] === "products") return null;

  return (
    <nav aria-label="Ruta" className="my-2 md:flex flex-wrap gap-1 text-slate-300 hidden ">
      {/* <Link to="/products" className="hover:text-white">
        Inicio
      </Link> */}
      {segments.map((segment, index) => {
        const to = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;

        return (
          <span key={to} className="flex gap-1">
            <span>/</span>
            {isLast ? (
              <span className="text-white">{decodeURIComponent(segment)}</span>
            ) : (
              <Link to={to} className="hover:text-white">
                {decodeURIComponent(segment)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};
