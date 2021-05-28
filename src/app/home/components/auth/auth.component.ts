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

  get notificationText(): string {

    return this.isSignedUp ? 
            'Looks like your email or password is incorrect...' :
            'User with this email already exists'
  }
}