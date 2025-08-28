
export interface LoginState {
  token: string | null;
  user: { email: string } | null;
  loading: boolean;
  error: string | null;
}

export const initialLoginState: LoginState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};
