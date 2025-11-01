import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { AuthRequest } from '../models/auth-request';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private _http = inject(HttpClient);
  private _baseUrl = 'http://localhost:9090/api/auth';

  public authenticateCredential(user: AuthRequest): Observable<AuthResponse> {
    // Backend auth route
    return this._http
      .post<any>(`${this._baseUrl}/auth/login`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap({
          next: (response) => {
            if (response?.token) {
              localStorage.setItem('token', response.token);
              const r = response.user?.role || response.role;
              const e = response.user?.email || response.email;
              const n = response.user?.name;
              localStorage.setItem('role', r || 'customer');
              localStorage.setItem('email', e || '');
              if (n) localStorage.setItem('name', n);
            }
          },
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  logout(): void {
    localStorage.clear();
  }

  // Register a new user
  registerUser(user: User): Observable<User> {
    return this._http.post<User>(`${this._baseUrl}/register`, user);
  }

  // Login
  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this._http.post(`${this._baseUrl}/login`, credentials);
  }

  // Get user by ID (optional)
  getUserById(id: string): Observable<User> {
    return this._http.get<User>(`${this._baseUrl}/${id}`);
  }
}
