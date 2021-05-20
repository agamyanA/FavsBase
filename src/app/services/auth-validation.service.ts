import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';

@Injectable({
  providedIn: 'root'
})

export class AuthValidationService {

  readonly vem: object = {
    email: {
      required: new TuiValidationError('Email is required'),
      invalid: new TuiValidationError('Email is invalid')
    },
    pw: {
      required: new TuiValidationError('Password is required'),
      length: new TuiValidationError('Password is too short')
    }
  }

  checkEmailErrors(form: FormGroup): object {
    return {
      required: form.get('email')?.errors?.required && form.get('email')?.touched,
      email: form.get('email')?.errors?.pattern && form.get('email')?.touched
    }
  }

  checkPwErrors(form: FormGroup): object {
    return {
      required: form.get('pw')?.errors?.required && form.get('pw')?.touched,
      length: form.get('pw')?.errors?.minlength && form.get('pw')?.touched
    }
  }
}