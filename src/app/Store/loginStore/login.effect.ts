import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LoginActions from './login.action';
import { LoginService } from '../../Service/login.service';  // ✅ replaced AuthService
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from '../../Service/notification.service';

@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);
  private loginService = inject(LoginService);
  private router = inject(Router);
  private notificationService = inject(NotificationService)

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.login),
      mergeMap(({ email, password }) =>
        this.loginService.login(email, password).pipe(
          map(res => {
            if (res?.success && res?.token) {
              localStorage.setItem('token', res.token);
              this.notificationService.success("SuccessFully Login");
              return LoginActions.loginSuccess({ token: res.token, email });
            }else{
              this.notificationService.error("Invalid Credentials")
              return LoginActions.loginFailure({
                error: res?.message ?? 'Login failed',
              });
            }
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
