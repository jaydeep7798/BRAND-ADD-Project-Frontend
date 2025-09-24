import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SignUpState } from "./signUp.state";

// Feature key (must match the one you register in StoreModule.forFeature)
export const SIGNUP_FEATURE_KEY = 'signup';

export const selectSignUpState = createFeatureSelector<SignUpState>(SIGNUP_FEATURE_KEY);


export const selectSignUpData = createSelector(
  selectSignUpState,
  (state: SignUpState) => state.signUpData
);

export const selectSignUpLoading = createSelector(
  selectSignUpState,
  (state: SignUpState) => state.loading
);

export const selectSignUpSuccess = createSelector(
  selectSignUpState,
  (state: SignUpState) => state.success
);

export const selectSignUpError = createSelector(
  selectSignUpState,
  (state: SignUpState) => state.error
);