import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Service/login.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']   // 👈 fixed styleUrls (plural)
  ,
  imports: [ReactiveFormsModule]
})
export class DashboardComponent implements OnInit {

  // ✅ define body as a property of the class
  body = {
    id: 123,
    name: 'Jaydeep',
    email: 'jaydeep@example.com',
    role: 'Developer'
  };

  searchForm!: FormGroup;
  constructor(
    private http: HttpClient,
    private logingService: LoginService,
    private fb: FormBuilder
  ) {
    
  }

 
  private apiUrl = 'https://dummyjson.com/products'; 
  products: any[] = [];

  // ✅ put API call inside ngOnInit (runs when component loads)
  ngOnInit(): void {
    // 1. Build the form
    this.searchForm = this.fb.group({
      value: ['']
    });

    // 2. Subscribe to changes
    this.searchForm.get('value')!.valueChanges.pipe(
      debounceTime(3000),   // optional delay
      distinctUntilChanged(),
      switchMap(query => {
        if (query) {
          return this.http.get<any>(`${this.apiUrl}/search?q=${query}`);
        } else {
          return of({ products: [] });
        }
      })
    ).subscribe(res => {
      this.products = res.products;
      console.log(this.products);
    });

    //Without switchMap
    // this.searchForm.get('value')!.valueChanges.pipe(
    //   // debounceTime(3000),   // optional delay
    //   distinctUntilChanged()
    // ).subscribe(query => {
    //   if (query) {
    //     this.http.get<any>(`${this.apiUrl}/search?q=${query}`).subscribe(res => {
    //       this.products = res.products;
    //       console.log(this.products);
    //     });
    //   } else {
    //     this.products = [];
    //   }
    // });
  }

  sendData(){
    this.logingService.addDetails(this.body).subscribe({
      next: (res) => console.log('✅ Response:', res),
      error: (err) => console.error('❌ Error:', err)
    });
  }

  logout(){
    localStorage.removeItem('token');
  }

  searchProducts(value: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?q=${value}`);
  }

  // Get products by category
  getProductsByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category/${category}`);
  }
}
