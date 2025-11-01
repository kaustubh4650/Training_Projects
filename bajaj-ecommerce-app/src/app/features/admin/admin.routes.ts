import { Routes } from '@angular/router';
import { AddProducts } from './components/add-products/add-products';

export const adminRoutes: Routes = [
  {
    path: 'add-product',
    component: AddProducts,
    title: 'Admin',
  },
];
