import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesApi {
  private _baseUrl: string = 'http://localhost:9090/api';

  private _httpClient = inject(HttpClient);

  public getAllCategories(): Observable<{ categories: Category[] }> {
    return this._httpClient.get<{ categories: Category[] }>(`${this._baseUrl}/categories`);
  }
}
