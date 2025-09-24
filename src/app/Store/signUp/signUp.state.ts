import { SignUp } from "../../Model/signUp.model";


export interface SignUpState {
  signUpData: SignUp | null;   // store signup data
  loading: boolean;            // API loading flag
  success: boolean;            // success flag
  error: string | null;        // error message
}

export const initialSignUpState: SignUpState = {
  signUpData: null,
  loading: false,
  success: false,
  error: null,
};
