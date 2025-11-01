import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductData } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsApi {
  private _baseUrl: string = 'http://localhost:9090/api';

  private _httpClient = inject(HttpClient);

  public getAllProducts(): Observable<{ data: ProductData[] }> {
    return this._httpClient.get<{ data: ProductData[] }>(`${this._baseUrl}/products`);
  }

  // Accept page & limit for server-side pagination
  public getProducts(
    page: number,
    limit: number
  ): Observable<{ data: ProductData[]; total: number }> {
    return this._httpClient.get<{ data: ProductData[]; total: number }>(
      `${this._baseUrl}/products?page=${page}&limit=${limit}`
    );
  }

  public getProductById(id: string) {
    return this._httpClient.get<{ data: any }>(`${this._baseUrl}/products/${id}`);
  }

  public getProductsByCategory(
    category: string
  ): Observable<{ data: ProductData[]; total: number }> {
    return this._httpClient.get<{ data: ProductData[]; total: number }>(
      `${this._baseUrl}/products?category=${category}`
    );
  }

  public searchProducts(keyword: string): Observable<{ data: ProductData[]; total: number }> {
    return this._httpClient.get<{ data: ProductData[]; total: number }>(
      `${this._baseUrl}/products?keyword=${keyword}`
    );
  }
}
