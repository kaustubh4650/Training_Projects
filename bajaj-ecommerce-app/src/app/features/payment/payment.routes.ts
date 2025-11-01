import { Routes } from '@angular/router';
import { PaymentDetails } from './components/payment-details/payment-details';

export const PaymentRoutes: Routes = [
  {
    path: '',
    component: PaymentDetails,
    title: 'Payment',
  },
];
