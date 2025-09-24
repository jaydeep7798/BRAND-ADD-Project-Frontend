import { Injectable } from '@angular/core';
import { SignUp } from '../Model/signUp.model';
import { SIGNUP_ENDPOINT } from '../Constants/constant';
import { environment } from '../Environment/environment';
import { SignUpResponse } from '../Message/SignUpResponse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  private loginUrl = `${environment.apiBaseUrl}${SIGNUP_ENDPOINT}`;

  signUp(signUpFormData :SignUp): Observable<SignUpResponse> {
      return this.http.post<SignUpResponse>(this.loginUrl, signUpFormData,{ headers: { 'Content-Type': 'application/json' } });
  }
}
