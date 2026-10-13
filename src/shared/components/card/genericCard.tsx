import { Link } from 'react-router-dom';

export type ProductCardData = {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  imageAlt: string;
  price: string;
  installmentPlan: string;
  sales: string;
  shipping: string;
  badge?: string;
  originalPrice?: string;
  discount?: string;
  rating?: string;
  releaseDate?: string;
};

type ProductCardProps = {
  product: ProductCardData;
};

export const GenericCard = ({ product }: ProductCardProps) => {
  return (
     <article className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        to={`/products/${product.id}`}
        aria-label={`Ver ${product.name}`}
        className="group flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <div className="relative  overflow-hidden bg-slate-100 sm:aspect-square">
          <img
            src={product.imageUrl}
            alt={product.imageAlt}
            loading="lazy"
            className="h-full w-full object-contain  transition-transform duration-300 group-hover:scale-[1.03] "
          />
          {product.badge && (
            <span className="absolute bottom-3 left-3 rounded-sm bg-primary px-2 py-1 text-xs font-semibold uppercase text-white">
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <p className="text-sm text-slate-500">{product.brand}</p>
          <h2 className="mt-1 text-[15px] font-medium leading-5 text-slate-900">
            {product.name}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-600">
            {product.rating && (
              <span className="font-medium text-slate-900">
                <span className="text-primary" aria-hidden="true">★</span>{' '}
                {product.rating}
              </span>
            )}
            <span>{product.sales}</span>
          </div>

          <div className="mt-auto pt-4">
            {product.originalPrice && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500 line-through">
                  {product.originalPrice}
                </span>
                {product.discount && (
                  <span className="rounded-sm bg-success px-1.5 py-0.5 font-semibold text-white">
                    {product.discount}
                  </span>
                )}
              </div>
            )}
            <p className="mt-1 flex flex-wrap items-baseline gap-2 text-2xl font-medium leading-tight text-slate-950">
              <span>{product.price}</span>
            </p>
            <p className="mt-1 text-sm leading-5 text-emerald-700">
              {product.installmentPlan}
            </p>
            <p className="mt-2 text-sm font-semibold text-emerald-700">
              {product.shipping}
            </p>
            {product.releaseDate && (
              <p className="mt-3 text-sm text-slate-500">
                {product.releaseDate}
              </p>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}
