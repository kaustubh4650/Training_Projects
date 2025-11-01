import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsApi } from '../../services/products-api';
import { CartService } from '../../../cart/services/cart.service';
import { ToastService } from '../../../../shared/pipes/toast.service';

@Component({
  selector: 'bajaj-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private _productsApi = inject(ProductsApi);
  private _cart = inject(CartService);
  private _toast = inject(ToastService);
  private _router = inject(Router);

  product: any = null;
  productId: string = '';

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this._productsApi.getProductById(this.productId).subscribe({
      next: (res) => (this.product = res.data),
      error: (err) => console.error(err),
    });
  }

  addToCart(): void {
    if (!this.product) return;

    const originalPrice = this.product.price || 0;
    const discountPercent = this.product.discount || 0;
    const finalPrice = originalPrice - (originalPrice * discountPercent) / 100;

    this._cart.add({
      productId: this.product._id,
      name: this.product.name,
      originalPrice,
      discountPercent,
      finalPrice,
      quantity: 1,
      imageUrl: this.product.images?.[0],
    });

    this._toast.show('🛒 Added to cart!', 'success');
    this._router.navigate(['/cart']);
  }
}
