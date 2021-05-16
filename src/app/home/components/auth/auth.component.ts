import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';

@Component({
  selector: 'auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss']
})

export class AuthComponent {

  @Output() auth: EventEmitter<any> = new EventEmitter()
  @Input() validation: object = {}

  isSignedup: boolean = true

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
    email: new FormControl(null, [Validators.required, Validators.email]),
    pw: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  })

  changeToSingup() {
    this.isSignedup = !this.isSignedup
  }

  onSubmit() {
    this.auth.emit({
      isSignedup: this.isSignedup,
      cred: this.authForm
    })
  }

  get emailErrors() {
    return {
      required: this.authForm.get('email')?.errors?.required && this.authForm.get('email')?.touched,
      email: this.authForm.get('email')?.errors?.email && this.authForm.get('email')?.touched,
    }
  }

  get pwErrors() {
    return {
      required: this.authForm.get('pw')?.errors?.required && this.authForm.get('pw')?.touched,
      length: this.authForm.get('pw')?.errors?.minlength && this.authForm.get('pw')?.touched
    }
  }
}