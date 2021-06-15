import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AuthComponent {

  @Output() auth: EventEmitter<any> = new EventEmitter()
  @Output() demo: EventEmitter<any> = new EventEmitter()
  @Input() authForm!: FormGroup
  @Input() validationErrorMessages: any
  @Input() emailErrors: any
  @Input() pwErrors: any
  @Input() authError!: BehaviorSubject<boolean>
  @Input() showSignInLoader!: BehaviorSubject<any>

  isSignedUp: boolean = true

  changeToSingUp() {
    this.isSignedUp = !this.isSignedUp
    this.authError.next(false)
  }

  onSubmit() {
    this.auth.emit(this.isSignedUp)
  }

  onDemo() {
    this.demo.emit()
  }

  get text() {
    return this.isSignedUp ?
          {
            buttonText: 'Sign in',
            notificationText: 'Looks like your email or password is incorrect...'
          } :

          {
            buttonText: 'Sign up',
            notificationText: 'User with this email already exists'
          }
  }
}