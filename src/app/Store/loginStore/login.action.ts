import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ token: string; email: string }>()
);

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Login] Logout');
