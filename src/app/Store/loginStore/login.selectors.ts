import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from './login.state';

export const selectLoginState = createFeatureSelector<LoginState>('login');

export const selectToken = createSelector(
  selectLoginState,
  (state) => state.token
);

export const selectIsLoggedIn = createSelector(
  selectToken,
  (token) => !!token
);

export const selectLoginLoading = createSelector(
  selectLoginState,
  (state) => state.loading
);

export const selectLoginError = createSelector(
  selectLoginState,
  (state) => state.error
);

export const selectLoginUser = createSelector(
  selectLoginState,
  (state) => state.user
);
