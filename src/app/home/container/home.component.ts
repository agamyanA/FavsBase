import { Component } from '@angular/core';
import { IAuth } from 'src/app/models/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})

export class HomeComponent {

  constructor(private auth: AuthService) {}

  handle(authInfo: IAuth) {

    if (authInfo.isSignedUp) {
      this.auth.signIn(authInfo.cred.email, authInfo.cred.pw)
    } else {
      this.auth.signUp(authInfo.cred.email, authInfo.cred.pw)
    }

  }  
}