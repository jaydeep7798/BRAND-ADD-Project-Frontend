import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Service/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']   // 👈 fixed styleUrls (plural)
})
export class DashboardComponent implements OnInit {

  // ✅ define body as a property of the class
  body = {
    id: 123,
    name: 'Jaydeep',
    email: 'jaydeep@example.com',
    role: 'Developer'
  };

  constructor(
    private http: HttpClient,
    private logingService: LoginService
  ) {}

  // ✅ put API call inside ngOnInit (runs when component loads)
  ngOnInit(): void {
   // this.sendData();
 
  }

  sendData(){
    this.logingService.addDetails(this.body).subscribe({
      next: (res) => console.log('✅ Response:', res),
      error: (err) => console.error('❌ Error:', err)
    });

  }
}
