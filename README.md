# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # ProductStore

  Aplicacion web para explorar productos y, mas adelante, permitir que compradores realicen pedidos y que administradores gestionen el catalogo.

  > Estado actual: el router base y las paginas iniciales de catalogo, detalle de producto y login ya existen. La autenticacion con API, la gestion de usuarios y los datos reales de productos todavia deben implementarse.

  ## Empezar

  Requisitos: Node.js y pnpm.

  ```bash
  pnpm install
  pnpm dev
  ```

  ## Arquitectura del frontend

  El frontend se organiza por funcionalidades para que cada modulo pueda crecer sin mezclar sus pantallas, componentes y llamadas a la API.

  ```text
  src/
    app/
      router.tsx             # Definicion de rutas
      AppLayout.tsx           # Navegacion compartida
      NotFoundPage.tsx
    features/
      auth/                 # Inicio de sesion, registro y estado de autenticacion
        api/
        components/
        pages/
      users/                # Perfil y gestion de usuarios
        api/
        components/
        pages/
      products/             # Catalogo publico y gestion administrativa
        api/
        components/
        pages/
      cart/                 # Carrito (modulo futuro)
      orders/               # Pedidos (modulo futuro)
    shared/
      components/           # Elementos reutilizables entre funcionalidades
      lib/                   # Utilidades generales
    assets/                  # Imagenes y otros recursos estaticos
  ```

  Los subdirectorios `api`, `components` y `pages` se agregan a cada modulo cuando hagan falta. `shared` se reserva para codigo verdaderamente reutilizable; la logica especifica de una funcionalidad permanece dentro de su modulo.

  Rutas iniciales: `/products` muestra el catalogo, `/products/:productId` el detalle y `/login` la pagina de acceso. La raiz redirige al catalogo. Las rutas `/admin/*` redirigen al login hasta que se implemente una sesion real; esta redireccion temporal no reemplaza la autorizacion del backend.

  ## Acceso y roles

  - El catalogo y el detalle de los productos seran publicos.
  - Los compradores podran explorar sin cuenta; se les pedira iniciar sesion al comenzar la compra.
  - Los administradores iniciaran sesion para crear, editar o retirar productos.
  - La interfaz puede ocultar opciones segun el rol, pero los permisos deben validarse tambien en el backend. Proteger una ruta del frontend por si sola no protege los datos.

  ## Modulos previstos

  - `auth`: inicio y cierre de sesion, registro y estado de autenticacion.
  - `users`: perfil del comprador y, si se necesita, gestion administrativa de usuarios.
  - `products`: listado, detalle, categorias y formularios de administracion.
  - `cart` y `orders`: carrito y seguimiento de pedidos cuando se incorporen las compras.

  ## Comandos

  ```bash
  pnpm dev      # Iniciar el servidor local
  pnpm build    # Verificar tipos y generar la compilacion
  pnpm lint     # Ejecutar ESLint
  pnpm preview  # Previsualizar la compilacion
  ```
