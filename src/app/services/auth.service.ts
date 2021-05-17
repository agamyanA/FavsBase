import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router) { }

  signUp(email: string, pw: string) {
    this.auth.createUserWithEmailAndPassword(email, pw).then(() => this.router.navigate(['dashboard']))
  }

  signIn (email: string, pw: string) {
    this.auth.signInWithEmailAndPassword(email, pw).then(() => this.router.navigate(['dashboard']))
  }

  signOut() {
    this.auth.signOut()
  }
}