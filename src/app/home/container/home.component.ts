import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthValidationService } from 'src/app/services/auth-validation.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnDestroy {
  
  constructor(
    private fb: FormBuilder,
    private validation: AuthValidationService,
    private auth: AuthService
  ) {}

  private notifier: Subject<any> = new Subject<any>()

  private emailPattern: RegExp = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/
  
  readonly validationErrorMessages: object = this.validation.vem

  readonly authError: BehaviorSubject<boolean> = this.auth.authError

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

  get email(): string {
    return this.authForm.value.email
  }

  get pw(): string {
    return this.authForm.value.pw
  }

  authHandler(isSignedUp: boolean) {

    if (isSignedUp) {
      this.auth.handler(this.auth.signIn(this.email, this.pw), this.notifier)                                  
    } else {
      this.auth.handler(this.auth.signUp(this.email, this.pw), this.notifier)      
    }
  }

  demoHandler() {
    this.auth.handler(this.auth.signInDemo(), this.notifier)
  }

  ngOnDestroy() {
    this.notifier.next()
    this.notifier.complete()
  }
}