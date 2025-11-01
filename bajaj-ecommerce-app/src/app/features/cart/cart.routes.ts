import { Routes } from '@angular/router';
import { CartDetails } from './components/cart-details/cart-details';

export const cartRoutes: Routes = [
  {
    path: '',
    component: CartDetails,
    title: 'Your Cart',
  },
];
