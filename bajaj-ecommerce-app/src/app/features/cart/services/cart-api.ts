import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartApi {
  private _http = inject(HttpClient);
  private _baseUrl = 'http://localhost:9090/api';
  private _cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this._cartCount.asObservable();

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
  }

  add(payload: any): Observable<any> {
    return this._http.post(`${this._baseUrl}/carts/items`, payload, {
      headers: this.authHeaders(),
    });
  }
  get(): Observable<any> {
    return this._http.get(`${this._baseUrl}/carts`, { headers: this.authHeaders() });
  }
  remove(id: string): Observable<any> {
    return this._http.delete(`${this._baseUrl}/carts/items/${id}`, { headers: this.authHeaders() });
  }
}
