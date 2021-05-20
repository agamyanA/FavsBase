import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss']
})

export class AuthComponent {

  @Output() auth: EventEmitter<any> = new EventEmitter()
  @Input() authForm!: FormGroup
  @Input() validationErrorMessages: any
  @Input() emailErrors: any
  @Input() pwErrors: any

  isSignedUp: boolean = true

  changeToSingUp() {
    this.isSignedUp = !this.isSignedUp
  }

  onSubmit() {
    this.auth.emit(this.isSignedUp)
  }
}