import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import * as SignUpActions from "./signUp.action";
import { SignUp } from "../../Model/signUp.model";
import { SignUpService } from "../../Service/sign-up.service";

@Injectable()
export class SignUpEffects {
  private actions$ = inject(Actions);
  private signUpService = inject(SignUpService);

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignUpActions.signUp),
      mergeMap((action: { signUpFormData: SignUp }) =>
        this.signUpService.signUp(action.signUpFormData).pipe(
          map((response) => SignUpActions.signUpSuccess({ response })),   
          catchError((error) =>
            of(SignUpActions.signUpFailure({ error: error.message }))     
          )
        )
      )
    )
  );
}
