import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../shared/components/button/button";
import { useCart } from "../../cart/useCart";
import { OpenImage } from "../components/openImage";
import { ModalBuy, type CheckoutItem } from "../components/modalBuy";

const features = [
  "Cantidad de joysticks: 1.",
  "Con conexión Bluetooth para usar en PS5 y dispositivos Android y iOS sin necesidad de cables.",
  "Incluye sensor de movimiento para captar tus gestos.",
];

const product: CheckoutItem = {
  id: 1,
  name: "Control Inalámbrico PlayStation DualSense Galactic Purple para PS5 con Bluetooth",
  image:
    "https://http2.mlstatic.com/D_Q_NP_774245-MLA115905303252_092026-F.webp",
  price: 289900,
  quantity: 1,
};

export function ProductDetailPage() {
  const { productId } = useParams();
  const { addItem } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalBuy, setIsModalBuy] = useState(false);

  return (
    <section className="flex flex-1 justify-center 2xl:mx-40 ">
      <div className="w-full bg-slate-50/45 backdrop-blur-sm flex flex-col md:flex-row shadow-xl p-4 rounded-md gap-4">
        {/* Miniaturas */}
        <div className="scrollbar-hidden hidden pr-2 lg:flex lg:flex-col lg:gap-2 lg:items-center lg:w-[7%] lg:shrink-0 lg:h-[300px] lg:overflow-y-auto lg:overflow-x-hidden">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div
              key={i}
              className={`border rounded-md h-16 w-full shrink-0 flex items-center justify-center text-xs text-gray-400 ${
                i === 2 ? "border-blue-500" : "border-gray-300 "
              }`}
            >
              foto
            </div>
          ))}
        </div>

        {/* Imagen principal */}
        <div className="w-full max-w-md mx-auto lg:mx-0 lg:max-w-none lg:w-[33%] lg:shrink-0 px-2 flex items-start justify-center">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full cursor-zoom-in"
          >
            <img
              className="w-full object-contain"
              src="https://http2.mlstatic.com/D_Q_NP_774245-MLA115905303252_092026-F.webp"
              alt="Control PlayStation DualSense"
            />
          </button>
        </div>

        {/* Información del producto */}
        <div className="w-full min-w-0 lg:flex-1 flex flex-col gap-2 bg-slate-50/40 backdrop-blur-sm p-4 rounded-md">
          <a href="#" className="text-sm text-blue-600 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-700 inline-block" />
            Visita la Tienda oficial de PlayStation
          </a>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <p>Nuevo | +100 vendidos</p>
            <button type="button" className="text-blue-500 text-xl">
              ♡
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="bg-orange-500 text-white font-semibold px-2 py-0.5 rounded-sm">
              MÁS VENDIDO
            </span>
            <span className="text-blue-600">1º en Gamepads y Joysticks</span>
          </div>

          <h1 className="text-2xl font-semibold leading-snug">
            Control Inalámbrico PlayStation DualSense Galactic Purple para PS5
            con Bluetooth {productId}
          </h1>

          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span>4.9</span>
            <span className="text-blue-500">★★★★★</span>
            <span>(97293)</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="bg-green-600 text-white font-semibold px-2 py-0.5 rounded-sm">
              ↓ BAJÓ DE PRECIO
            </span>
            <span className="text-gray-600">Lo viste a $ 299.900</span>
          </div>

          <p className="text-sm text-gray-400 line-through">$ 395.900</p>
          <p className="text-4xl font-light flex items-center gap-2">
            $ <span>289.900</span>
            <span className="bg-green-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-sm">
              26% OFF
            </span>
          </p>

          <p className="text-sm text-green-600">
            3 cuotas de $ 96.633 con 0% de interés
          </p>
          <a href="#" className="text-sm text-blue-600">
            Ver los medios de pago
          </a>

          <div className="mt-2">
            <p className="text-sm">
              Color: <span className="font-bold">Galactic purple</span>
            </p>
            <div className="mt-2 border border-gray-300 rounded-md p-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-700 inline-block" />
                <span className="text-sm">Galactic purple</span>
              </div>
              <span className="text-blue-500">⌄</span>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold">
              Lo que tienes que saber de este producto
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 flex flex-col gap-1">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Caja de compra */}
        <div className="w-full lg:w-[25%] lg:shrink-0 lg:self-start border-2 border-gray-300 rounded-md p-4 flex flex-col gap-4 bg-slate-50/40 backdrop-blur-sm">
          <div className="text-sm">
            <p>
              <span className="text-green-600 font-semibold">Llega gratis</span>{" "}
              el miércoles
            </p>
            <a href="#" className="text-blue-600">
              Más detalles y formas de entrega
            </a>
          </div>

          <div className="text-sm">
            <p>
              <span className="text-green-600 font-semibold">
                Retira gratis
              </span>{" "}
              a partir del miércoles en una agencia de Mercado Libre
            </p>
            <a href="#" className="text-blue-600">
              Ver en el mapa
            </a>
          </div>

          <div className="text-sm">
            <p className="font-semibold">Stock disponible</p>
            <div className="flex items-center gap-2 mt-1">
              <label htmlFor="quantity">Cantidad:</label>
              <select id="quantity" className="text-sm">
                <option value="1">1 unidad</option>
              </select>
              <span className="text-gray-500 text-xs">(+25 disponibles)</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              title="Comprar ahora"
              onClick={() => setIsModalBuy(true)}
            />
            <Button
              title="Agregar al carrito"
              variant="secondary"
              onClick={() => addItem(product)}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-full bg-blue-700 inline-block shrink-0" />
            <div className="text-sm">
              <p>
                Tienda oficial{" "}
                <span className="text-blue-600">PlayStation</span>
              </p>
              <p className="font-semibold">+10 mil ventas</p>
            </div>
          </div>

          <div className="text-sm text-gray-600 flex flex-col gap-3">
            <p>
              <a href="#" className="text-blue-600">
                Devolución gratis.
              </a>{" "}
              Tienes 30 días desde que lo recibes.
            </p>
            <p>
              <a href="#" className="text-blue-600">
                Compra Protegida.
              </a>{" "}
              Recibe el producto que esperabas o te devolvemos tu dinero.
            </p>
          </div>

          <a href="#" className="text-sm text-blue-600">
            Agregar a una lista
          </a>
        </div>
      </div>
      <OpenImage isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ModalBuy
        isOpen={isModalBuy}
        onClose={() => setIsModalBuy(false)}
        items={[product]}
      />
    </section>
  );
}
