import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LoginActions from './login.action';
import { LoginService } from '../../Service/login.service';  // ✅ replaced AuthService
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);
  private loginService = inject(LoginService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.login),
      mergeMap(({ email, password }) =>
        this.loginService.login(email, password).pipe(
          map(res => {
            if (res?.success && res?.token) {
              localStorage.setItem('token', res.token);
              return LoginActions.loginSuccess({ token: res.token, email });
            }
            return LoginActions.loginFailure({
              error: res?.message ?? 'Login failed',
            });
          }),
          catchError(err =>
            of(LoginActions.loginFailure({ error: err?.message ?? 'Login error' }))
          )
        )
      )
    )
  );

  navigateOnSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.loginSuccess),
        tap(() => this.router.navigate(['/dashboard']))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.logout),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );
}
