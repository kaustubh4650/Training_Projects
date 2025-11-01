// import { HttpInterceptorFn, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { catchError, switchMap, throwError } from 'rxjs';

// export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
//   const http = inject(HttpClient);

//   if (
//     req.url.includes('/users/authenticate') ||
//     req.url.includes('/users/register') ||
//     req.url.includes('/users/refresh')
//   ) {
//     return next(req);
//   }

//   const accessToken = localStorage.getItem('token');
//   const refreshToken = localStorage.getItem('refreshToken');

//   let modifiedReq = req;
//   if (accessToken) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'bajaj-authorization-token': accessToken,
//     });
//     modifiedReq = req.clone({ headers });
//   }

//   return next(modifiedReq).pipe(
//     catchError((error: HttpErrorResponse) => {

//       if (error.status === 401 && refreshToken) {

//         return http
//           .post<{ newAccessToken: any }>('http://localhost:9090/api/users/refresh', {
//             refreshToken,
//           })
//           .pipe(
//             switchMap((res) => {

//               const newToken = res.newAccessToken.token;
//               localStorage.setItem('token', newToken);

//               const retryHeaders = new HttpHeaders({
//                 'Content-Type': 'application/json',
//                 'bajaj-authorization-token': newToken,
//               });

//               const retriedReq = req.clone({ headers: retryHeaders });
//               console.log(`new Req : ${retriedReq}`);
//               return next(retriedReq);
//             }),
//             catchError((refreshErr) => {
//               console.error('Refresh token failed:', refreshErr);

//               localStorage.clear();
//               return throwError(() => refreshErr);
//             })
//           );
//       }
//       return throwError(() => error);
//     })
//   );
// };

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { SecurityApi } from '../../features/security/services/security-api';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const securityApi = inject(SecurityApi);
  const isAuthEndpoint = req.url.includes('/users');
  const token = localStorage.getItem('token');

  // Step 1️- Attach token to non-auth requests
  let modifiedReq = req;
  if (!isAuthEndpoint) {
    let headers = req.headers
      .set('Content-Type', 'application/json')
      .set('bajaj-authorization-token', token || '');
    modifiedReq = req.clone({ headers });
  }

  // Step 2️- Handle expired token automatically
  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isAuthEndpoint) {
        console.warn('Token expired. Refreshing...');
        return securityApi.refreshToken().pipe(
          switchMap((response) => {
            const newToken = response.token;
            console.log('Token refreshed successfully:', JSON.stringify(response));

            // store new token for next calls
            localStorage.setItem('token', newToken);
            if (response.refreshToken) localStorage.setItem('refreshToken', response.refreshToken);

            // retry original request with new token
            const retryReq = req.clone({
              setHeaders: {
                'Content-Type': 'application/json',
                'bajaj-authorization-token': newToken,
              },
            });
            return next(retryReq);
          }),
          catchError((refreshError) => {
            console.error('Refresh failed, logging out.');
            securityApi.logout();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
