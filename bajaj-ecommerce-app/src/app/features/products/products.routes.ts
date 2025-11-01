import { Routes } from '@angular/router';
import { Dashboard } from '../../shared/components/dashboard/dashboard';

export const productsRoutes: Routes = [
  {
    path: '',
    component: Dashboard,
    title: 'Products',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/products-list/products-list').then((m) => m.ProductsList),
      },
      {
        path: 'category/:category',
        loadComponent: () =>
          import('./components/products-list/products-list').then((m) => m.ProductsList),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./components/product-details/product-details').then((m) => m.ProductDetails),
      },
    ],
  },
];
