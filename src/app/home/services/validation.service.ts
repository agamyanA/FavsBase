import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';

@Injectable()

export class ValidationService {

  errorMessages = {
    email: {
      required: new TuiValidationError('Email is required'),
      invalid: new TuiValidationError('Email is invalid')
    },
    pw: {
      required: new TuiValidationError('Password is required'),
      length: new TuiValidationError('Password is too short')
    }
  }

  emailErrors(authForm: FormGroup) {
    return {
      required: authForm.get('email')?.errors?.required && authForm.get('email')?.touched,
      email: authForm.get('email')?.errors?.email && authForm.get('email')?.touched,
    }
  }

  pwErrors(authForm: FormGroup) {
    return {
      required: authForm.get('pw')?.errors?.required && authForm.get('pw')?.touched,
      length: authForm.get('pw')?.errors?.minlength && authForm.get('pw')?.touched
    }
  }

  validation(emailErrors: object, pwErrors: object) {
    return {
      email: {
        errors: [emailErrors],
        errorMessages: [this.errorMessages.email]
      },
      pw: {
        errors: [pwErrors],
        errorMessages: [this.errorMessages.pw]
      }
    }
  }
}