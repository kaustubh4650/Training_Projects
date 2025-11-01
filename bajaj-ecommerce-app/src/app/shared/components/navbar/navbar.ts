import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { Subject, debounceTime } from 'rxjs';
import { CartApi } from '../../../features/cart/services/cart-api';
import { CartService } from '../../../features/cart/services/cart.service';

@Component({
  selector: 'bajaj-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  searchQuery: string = '';
  private _router = inject(Router);
  private _cart = inject(CartService);
  private searchSubject = new Subject<string>();

  cartCount = 0;

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(500)).subscribe((query) => {
      if (query.trim()) {
        // 🔍 Navigate to search results page dynamically
        this._router.navigate(['/products'], {
          queryParams: { keyword: query },
        });
      } else {
        // 🧹 Clear search results when box is empty
        this._router.navigate(['/products'], { queryParams: {} });
      }
    });

    this._cart.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }

  loadCartCount() {
    const items = this._cart.items;
    console.log(items);
    this.cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  }

  onSearch(event: Event) {
    this.searchSubject.next(this.searchQuery);
  }

  protected get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  protected get userRole(): string | null {
    return localStorage.getItem('role');
  }

  protected get isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  logout(): void {
    localStorage.clear();
    this._cart.clear();
    this._router.navigate(['/home']);
  }
}
