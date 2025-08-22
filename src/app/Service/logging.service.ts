import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private http: HttpClient) { }

  private serverUrl = 'http://localhost:3000/logs';

  log(message: string) {
    console.log('📢 Browser:', message); // ✅ browser console
    //this.http.post(this.serverUrl, { level: 'log', message }).subscribe();
  }

  debug(message: string) {
    console.debug('🐞 Debug:', message);
    //this.http.post(this.serverUrl, { level: 'debug', message }).subscribe();
  }

  error(message: string) {
    console.error('❌ Error:', message);
    //this.http.post(this.serverUrl, { level: 'error', message }).subscribe();
  }
}
