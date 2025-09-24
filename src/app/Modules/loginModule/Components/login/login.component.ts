import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { LoggingService } from '../../../../Service/logging.service';
import { DispatcherService } from '../../../../Service/dispatcher.service';


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
    private dispatcherService :DispatcherService,
    private renderer: Renderer2
    ){
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required ,Validators.email]],
      Password :['' ,[Validators.required ,Validators.maxLength(6)]]
    }) 
  }

  
  ngOnInit() {
    // Add background class to body when login page is loaded
    this.renderer.addClass(document.body, 'login-background');
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

  ngOnDestroy() {
    // Remove background class when navigating away
    this.renderer.removeClass(document.body, 'login-background');
  }
}
