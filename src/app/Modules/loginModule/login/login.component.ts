import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoggingService } from '../../../Service/logging.service';
import { LoginService } from '../../../Service/login.service';
import { DispatcherService } from '../../../Service/dispatcher.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginForm :FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private logger: LoggingService,
    private dispatcherService :DispatcherService
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
    this.dispatcherService.login(email, password);
  }
}
