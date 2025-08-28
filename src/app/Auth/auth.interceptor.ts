// 

// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (req.url.includes('/login')) {
    console.log('⏭️ Skipping token for login request');
    return next(req);
  }

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('🚀 Functional Interceptor added token:', cloned.headers.get('Authorization'));
    return next(cloned);
  }

  console.log('⚠️ No token found, sending request as is');
  return next(req);
};
