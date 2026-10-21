import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { CartProvider } from './features/cart/CartProvider';

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
