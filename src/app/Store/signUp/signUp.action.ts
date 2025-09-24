import { createAction, props } from "@ngrx/store";
import { SignUp } from "../../Model/signUp.model";
import { SignUpResponse } from "../../Message/SignUpResponse";

//signup Actions
export const signUp = createAction(
    '[SignUp] SignUp',
    props<{ signUpFormData :SignUp}>()
);

// On success
export const signUpSuccess = createAction(
    '[SignUp API] Sign Up Success',
    props<{ response: SignUpResponse }>()
);
  
// On failure
export const signUpFailure = createAction(
    '[SignUp API] Sign Up Failure',
    props<{ error: string }>()
);