import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as LoginActions from '../Store/loginStore/login.action';
import * as LoginSelectors from '../Store/loginStore/login.selectors';
import * as SignUpActions  from '../Store/signUp/signUp.action';
import * as SignUpSelectors from '../Store/signUp/signUp.selectors';

import { Observable } from 'rxjs';
import { SignUp } from '../Model/signUp.model';


@Injectable({
  providedIn: 'root'
})
export class DispatcherService {

  token$: Observable<string | null>;

  constructor(private store: Store) { 
    this.token$ = this.store.select(LoginSelectors.selectToken);
  }


  login(email: string, password: string) {
    this.store.dispatch(LoginActions.login({ email, password }));
  }

  signup(signUpFormData:SignUp){
    this.store.dispatch(SignUpActions.signUp({signUpFormData}))
  }


}
