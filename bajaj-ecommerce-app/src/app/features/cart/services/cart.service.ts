// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// export interface CartItem {
//   productId: string;
//   name: string;
//   originalPrice: number;
//   discountPercent: number;
//   finalPrice: number;
//   quantity: number;
//   imageUrl?: string;
// }

// @Injectable({ providedIn: 'root' })
// export class CartService {
//   private _items: CartItem[] = [];
//   private _cartCount = new BehaviorSubject<number>(0);

//   cartCount$ = this._cartCount.asObservable();

//   private updateCount() {
//     const total = this._items.reduce((sum, i) => sum + i.quantity, 0);
//     this._cartCount.next(total);
//   }

//   get items(): CartItem[] {
//     return [...this._items];
//   }

//   add(item: CartItem): void {
//     const existing = this._items.find((i) => i.productId === item.productId);
//     if (existing) {
//       existing.quantity += item.quantity;
//     } else {
//       this._items.push({ ...item });
//     }
//     this.updateCount();
//   }

//   updateQuantity(productId: string, quantity: number): void {
//     const it = this._items.find((i) => i.productId === productId);
//     if (it) {
//       if (quantity <= 0) {
//         this.remove(productId);
//       } else {
//         it.quantity = quantity;
//       }
//       this.updateCount();
//     }
//   }

//   remove(productId: string): void {
//     this._items = this._items.filter((i) => i.productId !== productId);
//     this.updateCount();
//   }

//   clear(): void {
//     this._items = [];
//     this.updateCount();
//   }

//   get totals() {
//     const subtotal = this._items.reduce((s, i) => s + i.finalPrice * i.quantity, 0);
//     return { subtotal, discount: 0, total: subtotal };
//   }
// }

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  productId: string;
  name: string;
  originalPrice: number;
  discountPercent: number;
  finalPrice: number;
  quantity: number;
  imageUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items: CartItem[] = [];
  private readonly STORAGE_KEY = 'bajaj_cart';

  // 🔹 BehaviorSubject emits current count and updates reactively
  private _cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this._cartCount.asObservable();

  constructor() {
    this.loadFromStorage();
    this.updateCartCount();
  }

  private saveToStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._items));
    this.updateCartCount();
  }

  private loadFromStorage() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this._items = JSON.parse(stored);
    }
  }

  private updateCartCount() {
    const totalItems = this._items.reduce((sum, i) => sum + i.quantity, 0);
    this._cartCount.next(totalItems);
  }

  get items(): CartItem[] {
    return [...this._items];
  }

  add(item: CartItem): void {
    const existing = this._items.find((i) => i.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this._items.push({ ...item });
    }
    this.saveToStorage();
  }

  updateQuantity(productId: string, quantity: number): void {
    const it = this._items.find((i) => i.productId === productId);
    if (it) {
      if (quantity <= 0) {
        this.remove(productId);
      } else {
        it.quantity = quantity;
        this.saveToStorage();
      }
    }
  }

  remove(productId: string): void {
    this._items = this._items.filter((i) => i.productId !== productId);
    this.saveToStorage();
  }

  clear(): void {
    this._items = [];
    // this.saveToStorage();
    localStorage.removeItem(this.STORAGE_KEY);
    this._cartCount.next(0);
  }

  get totals() {
    const subtotal = this._items.reduce((s, i) => s + i.finalPrice * i.quantity, 0);
    return { subtotal, discount: 0, total: subtotal };
  }
}
