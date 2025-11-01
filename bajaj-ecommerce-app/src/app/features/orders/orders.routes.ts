import { Routes } from '@angular/router';
import { OrdersList } from './components/orders-list/orders-list';

export const OrderRoutes: Routes = [
  {
    path: '',
    component: OrdersList,
    title: 'Orders',
  },
];
