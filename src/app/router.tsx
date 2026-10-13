import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { NotFoundPage } from './NotFoundPage';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { ProductDetailPage } from '../features/products/pages/ProductDetailPage';
import { ProductListPage } from '../features/products/pages/ProductListPage';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Navigate to="/products" replace /> },
      { path: '/products', element: <ProductListPage /> },
      { path: '/products/:productId', element: <ProductDetailPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/admin/*', element: <Navigate to="/login" replace /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);