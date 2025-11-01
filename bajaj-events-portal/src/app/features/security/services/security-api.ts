import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, tap, throwError } from 'rxjs';

import { AuthRequest } from '../models/auth-request';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class SecurityApi {
  private _baseUrl: string = 'http://localhost:9090/api';
  // private _baseUrl: string = 'http://192.168.1.34:9090/api';
  private _httpClient = inject(HttpClient);

  public authenticateCredentials(user: AuthRequest): Observable<AuthResponse> {
    return this._httpClient
      .post<AuthResponse>(`${this._baseUrl}/users/authenticate`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap({
          next: (res) => {
            if (res.token) {
              localStorage.setItem('token', res.token);
              localStorage.setItem('refreshToken', res.refreshToken);
              localStorage.setItem('role', res.role);
              localStorage.setItem('email', res.email);
            }
          },
        })
      );
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  public getRole(): string | null {
    return localStorage.getItem('role');
  }

  public logout(): void {
    localStorage.clear();
  }

  public refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    const email = localStorage.getItem('email');

    if (!refreshToken || !email) {
      console.warn('No refresh token or email available. Logging out.');
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    return this._httpClient
      .post<AuthResponse>(
        `${this._baseUrl}/users/refresh`,
        { email, refreshToken },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        tap((response) => {
          // Update both tokens if available
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          if (response.refreshToken) {
            localStorage.setItem('refreshToken', response.refreshToken);
          }

          // Optional: log for debugging (remove in production)
          console.log('Token refreshed successfully:', response);
        })
        // catchError(err => {
        //   console.error('Refresh token failed:', err);
        //   this.logout();
        //   return throwError(() => err);
        // })
      );
  }
}
