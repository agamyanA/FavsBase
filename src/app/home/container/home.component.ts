import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthValidationService } from 'src/app/services/auth-validation.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})

export class HomeComponent {
  
  constructor(
    private fb: FormBuilder,
    private validation: AuthValidationService,
    private auth: AuthService
  ) {}
  
  private emailPattern: RegExp = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/
  
  readonly validationErrorMessages: object = this.validation.vem

  authForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
    pw: [null, [Validators.required, Validators.minLength(6)]],
  })

  get emailErrors(): object {
    return this.validation.checkEmailErrors(this.authForm)
  }

  get pwErrors(): object {
    return this.validation.checkPwErrors(this.authForm)
  }

  authHandler(isSignedUp: boolean) {
    if(isSignedUp) {
      this.auth.signIn(this.authForm.value.email, this.authForm.value.pw)
    } else {
      this.auth.signUp(this.authForm.value.email, this.authForm.value.pw)
    }
  }
}