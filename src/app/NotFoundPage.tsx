import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Página no encontrada</h1>
      <Link className="mt-4 inline-block text-sm font-medium underline" to="/products">
        Volver al catálogo
      </Link>
    </section>
  );
}