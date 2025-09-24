import { createReducer, on } from "@ngrx/store";
import { initialSignUpState, SignUpState } from "./signUp.state";
import * as SignUpActions from "./signUp.action";

export const signUpReducer = createReducer<SignUpState>( 
    initialSignUpState,
    on(SignUpActions.signUp, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
      
    on(SignUpActions.signUpSuccess, (state, { response }) => ({
        ...state,
        userId: response.userId,
        loading: false,
        error: null,
      })),      
      
    on(SignUpActions.signUpFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

);