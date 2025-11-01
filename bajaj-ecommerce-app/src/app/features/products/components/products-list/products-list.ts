import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Product, ProductData } from '../../models/product';
import { Subscription } from 'rxjs';
import { ProductsApi } from '../../services/products-api';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartApi } from '../../../cart/services/cart-api';
import { ProductDetailsResponse } from '../../models/product-details-response';
import { CartService } from '../../../cart/services/cart.service';
import { ToastService } from '../../../../shared/pipes/toast.service';

@Component({
  selector: 'bajaj-products-list',
  imports: [CommonModule, NgxPaginationModule, FormsModule, RouterLink],
  templateUrl: './products-list.html',
  standalone: true,
  styleUrl: './products-list.css',
})
export class ProductsList implements OnInit, OnDestroy {
  private _productsApi = inject(ProductsApi);
  private _Activatedroute = inject(ActivatedRoute);
  private _productsServiceSubscription: Subscription;
  private _cartApi = inject(CartApi);

  protected pageNumber: number = 1;
  protected pageSize: number = 10;
  protected totalItems: number = 0;
  protected totalPages: number = 0;
  protected isLoading: boolean = false;

  protected products: ProductData[] = [];
  protected category: string | null = null;
  protected product: ProductDetailsResponse;
  // private _cart = inject(CartService);
  private _cart = inject(CartApi);
  private _toast = inject(ToastService);
  private _router = inject(Router);

  constructor(private router: Router) {}

  goToDetails(id: string) {
    this.router.navigate(['/products', id]);
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.category = params.get('category');
      if (this.category) {
        this.loadProducts(this.pageNumber);
      }
    });

    this._Activatedroute.queryParamMap.subscribe((queryParams) => {
      const keyword = queryParams.get('keyword');
      if (keyword) {
        this.searchProducts(keyword);
      } else {
        this.loadProducts(this.pageNumber);
      }
    });
  }

  loadProducts(page: number) {
    this.isLoading = true;

    if (this._productsServiceSubscription) {
      this._productsServiceSubscription.unsubscribe();
    }

    if (this.category) {
      // ✅ Fetch products by category
      this._productsServiceSubscription = this._productsApi
        .getProductsByCategory(this.category)
        .subscribe({
          next: (res) => {
            this.products = res.data;
            this.isLoading = false;
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
          },
        });
    } else {
      this._productsServiceSubscription = this._productsApi
        .getProducts(page, this.pageSize)
        .subscribe({
          next: (res) => {
            this.products = res.data;
            this.totalItems = res.total;
            this.totalPages = Math.ceil(res.total / this.pageSize);
            this.isLoading = false;
          },
          error: (err) => console.log(err),
        });
    }
  }

  onPageChange(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.pageNumber = newPage;
    this.loadProducts(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPageNumbers(): number[] {
    const range: number[] = [];
    const maxVisible = 5; // show up to 5 numbers at a time
    let start = Math.max(1, this.pageNumber - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }

  protected addToCart(p: ProductData): void {
    if (!p) return;

    const token = localStorage.getItem('token');
    if (!token) {
      this._toast.show('Please login to add items to cart', 'warning');
      this._router.navigate(['/auth/login']);
      return;
    }

    const payload = {
      productId: p._id,
      quantity: 1,
    };

    this._cartApi.add(payload).subscribe({
      next: (res) => {
        this._toast.show('Item added to cart', 'success');
        console.log('Cart updated:', res.cart);
      },
      error: (err) => {
        console.error('Add to cart failed:', err);
        this._toast.show('Failed to add item', 'danger');
      },
    });
  }

  searchProducts(keyword: string) {
    this.isLoading = true;

    if (this._productsServiceSubscription) {
      this._productsServiceSubscription.unsubscribe();
    }

    this._productsServiceSubscription = this._productsApi.searchProducts(keyword).subscribe({
      next: (res) => {
        this.products = res.data;
        this.totalItems = res.total || res.data.length;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    if (this._productsServiceSubscription) {
      this._productsServiceSubscription.unsubscribe();
    }
  }
}
