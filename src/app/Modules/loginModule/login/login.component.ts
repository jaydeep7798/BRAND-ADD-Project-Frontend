import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoggingService } from '../../../Service/logging.service';
import { LoginService } from '../../../Service/login.service';


@Component({
  selector: 'app-login',
  standalone: false, 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm :FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private logger: LoggingService,
    private loginService: LoginService
    ){
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required ,Validators.email]],
      Password :['' ,[Validators.required ,Validators.maxLength(6)]]
    }) 
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const email = this.loginForm.get('Email')?.value;
    const password = this.loginForm.get('Password')?.value;
    this.logger.debug(`Attempting login for: ${email}`);
    this.loginService.login(email, password).subscribe({
      next: (res) => {
        if (res.success) {  
          this.logger.debug(`Login successful for ${email}`);
        } else {
          this.logger.debug(`Login failed for ${email}: ${res.message}`);
        }
      },
      error: (err) => {
        this.logger.debug(`Login error for ${email}: ${err.message}`);
      }
    });
  }
}
