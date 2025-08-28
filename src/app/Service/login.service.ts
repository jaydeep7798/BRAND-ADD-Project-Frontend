import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../Message/response';
import { environment } from '../Environment/environment';
import { LOGIN_ENDPOINT } from '../Constants/constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3333/api/test';

  token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  private loginUrl = `${environment.apiBaseUrl}${LOGIN_ENDPOINT}`;

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, { email, password });
  }
    
  addDetails(body: { id: number; name: string; email: string; role: string; }){
  
    return this.http.post<any>(this.apiUrl,body);
  }
  
  authCheckForLogin(){
    if (!this.token){
      return false;
    } else{
      return true;
    }
  }
}
