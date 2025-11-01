import { Routes } from '@angular/router';

import { Home } from './shared/components/home/home';

import { productsRoutes } from './features/products/products.routes';
import { SecurityRoutes } from './features/security/security.routes';
import { cartRoutes } from './features/cart/cart.routes';
import { PaymentRoutes } from './features/payment/payment.routes';
import { OrderRoutes } from './features/orders/orders.routes';
import { adminRoutes } from './features/admin/admin.routes';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home',
  },
  {
    path: 'home',
    component: Home,
    title: 'Home',
  },
  {
    path: 'auth',
    children: [...SecurityRoutes],
  },
  { path: 'cart', children: cartRoutes },

  { path: 'payment', children: PaymentRoutes },

  { path: 'orders', children: OrderRoutes },

  { path: 'admin', children: adminRoutes },

  {
    path: 'products',
    children: productsRoutes,
  },
];
