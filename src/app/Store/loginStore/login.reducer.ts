import { createReducer, on } from '@ngrx/store';
import { initialLoginState, LoginState } from './login.state';
import * as LoginActions from './login.action';

export const loginReducer = createReducer<LoginState>(
  initialLoginState,

  on(LoginActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(LoginActions.loginSuccess, (state, { token, email }) => ({
    ...state,
    token,
    user: { email },
    loading: false,
    error: null,
  })),

  on(LoginActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(LoginActions.logout, () => initialLoginState)
);
