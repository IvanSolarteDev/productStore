import { useParams } from 'react-router-dom';

export function ProductDetailPage() {
  const { productId } = useParams();

  return (
    <section>
      <h1 className="text-2xl font-semibold">Detalle del producto</h1>
      <p className="mt-2 text-slate-600">Producto: {productId}</p>
    </section>
  );
}