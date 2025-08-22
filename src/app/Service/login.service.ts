import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../app/Environment/environment';
import { LOGIN_ENDPOINT } from '../Constants/constant';
import { LoginResponse } from '../Message/response';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = `${environment.apiBaseUrl}${LOGIN_ENDPOINT}`;

  constructor(private http: HttpClient) { }
  
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, { email, password });
  }
}
