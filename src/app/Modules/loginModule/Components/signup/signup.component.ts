import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUp } from '../../../../Model/signUp.model';
import { DispatcherService } from '../../../../Service/dispatcher.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signFormUp :FormGroup;
  otpSent = false;
  otpVerified = false;

  constructor(
    private fb:FormBuilder,
    private dispatcherService :DispatcherService,
  ){
    this.signFormUp = this.fb.group({
      fullName:['',[Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required ,Validators.email]],
      //password :['' ,[Validators.required ,Validators.maxLength(6)]],
      //OTP: [''],  
      phone: ['',[Validators.maxLength(10),Validators.pattern('^[0-9]{10}$') ]],
      //confirmPassword: [''],
      city:[''],
      terms: [false, Validators.requiredTrue]  
    })
  }

  submitSignUpForm(){
    if (this.signFormUp.invalid) {
      this.signFormUp.markAllAsTouched();
      return;
    }
    const signUpData: SignUp = this.signFormUp.value as SignUp;
    this.dispatcherService.signup(signUpData);
  }
}
