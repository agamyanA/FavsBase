import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';

@Component({
  selector: 'auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss']
})

export class AuthComponent {

  @Output() auth: EventEmitter<any> = new EventEmitter()

  isSignedUp: boolean = true

  emailPattern: RegExp = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/

  validationErrors = {
    email: {
      required: new TuiValidationError('Email is required'),
      invalid: new TuiValidationError('Email is invalid')
    },
    pw: {
      required: new TuiValidationError('Password is required'),
      length: new TuiValidationError('Password is too short')
    }
  }

  authForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)]),
    pw: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  })

  changeToSingUp() {
    this.isSignedUp = !this.isSignedUp
  }

  onSubmit() {
    this.auth.emit({
      isSignedup: this.isSignedUp,
      cred: this.authForm.value
    })
  }

  get emailErrors() {
    return {
      required: this.authForm.get('email')?.errors?.required && this.authForm.get('email')?.touched,
      email: this.authForm.get('email')?.errors?.pattern && this.authForm.get('email')?.touched,
    }
  }

  get pwErrors() {
    return {
      required: this.authForm.get('pw')?.errors?.required && this.authForm.get('pw')?.touched,
      length: this.authForm.get('pw')?.errors?.minlength && this.authForm.get('pw')?.touched
    }
  }
}