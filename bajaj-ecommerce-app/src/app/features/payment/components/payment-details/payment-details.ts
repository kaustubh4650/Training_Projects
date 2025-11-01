import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bajaj-payment-details',
  imports: [],
  templateUrl: './payment-details.html',
  styleUrl: './payment-details.css',
})
export class PaymentDetails {
  paymentFailed = false;
  private _router = inject(Router);

  onSuccess(): void {
    this.paymentFailed = false;
    this._router.navigate(['/orders']);
  }

  onFailed(): void {
    alert('Payment Failed');
  }
}
