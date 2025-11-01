import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CartApi } from '../../services/cart-api';

import { Router, RouterLink } from '@angular/router';

import { ToastService } from '../../../../shared/pipes/toast.service';

@Component({
  selector: 'bajaj-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-details.html',
  styleUrl: './cart-details.css',
})
export class CartDetails {
  private _cartService = inject(CartApi);
  private _router = inject(Router);

  items: any[] = [];
  totals = { subtotal: 0, total: 0 };

  ngOnInit() {
    this.loadCart();
  }

  // ✅ Fetch user cart from backend
  loadCart() {
    const token = localStorage.getItem('token');
    if (!token) return;

    // GET /api/carts  (you must have this route on backend)
    this._cartService.get().subscribe({
      next: (res: any) => {
        this.items = res.cart?.items || [];
        this.calculateTotals();
        this.items = res.cart.items.map((it: any) => ({
          ...it,
          name: it.productId?.name || 'Unknown',
          imageUrl: it.productId?.images?.[0] || 'assets/placeholder.png',
          originalPrice: it.productId?.price || it.price,
          discountPercent: it.productId?.discount || 0,
          finalPrice: (it.productId?.price || it.price) * (1 - (it.productId?.discount || 0) / 100),
        }));
      },
    });
  }

  // ✅ Increase quantity
  inc(item: any) {
    item.quantity++;
    this.updateCartItem(item);
  }

  // ✅ Decrease quantity
  dec(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartItem(item);
    }
  }

  // ✅ Remove item completely
  remove(item: any) {
    this._cartService.remove(item.productId._id || item.productId).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Remove failed', err),
    });
  }

  // ✅ Update item quantity
  updateCartItem(item: any) {
    const payload = {
      productId: item.productId._id || item.productId,
      quantity: item.quantity,
    };

    this._cartService.add(payload).subscribe({
      next: (res) => {
        this.items = res.cart?.items || [];
        this.calculateTotals();
      },
      error: (err) => console.error('Update failed', err),
    });
  }

  // ✅ Calculate total/subtotal
  calculateTotals() {
    const subtotal = this.items.reduce((sum, i) => {
      const price = i.productId?.price || i.price || 0;
      const discount = i.productId?.discount || 0;
      const finalPrice = price * (1 - discount / 100);
      return sum + finalPrice * i.quantity;
    }, 0);
    this.totals = {
      subtotal,
      total: subtotal,
    };
  }

  // ✅ Go to checkout page
  checkout() {
    this._router.navigate(['/payment']);
  }
}
