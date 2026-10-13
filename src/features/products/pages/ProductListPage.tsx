import { GenericCard } from "../../../shared/components/card/genericCard";
import { mockProducts as products } from "../../../shared/mock/products";

export function ProductListPage() {
  return (
    <section className="w-full px-4 py-6 sm:px-6 sm:py-8">
      <header className="mb-5 flex items-end justify-between gap-3 sm:mb-6">
        <div>
          <p className="text-sm font-medium text-primary">Tienda</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-300 sm:text-3xl">
            Controles para PS5
          </h1>
        </div>
        <p className="shrink-0 text-sm text-slate-600">
          {products.length} productos
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        {products.map((product) => (
          //   <ProductCard key={product.id} product={product} />
          <GenericCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
