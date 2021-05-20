import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router) { }

  async signUp(email: string, pw: string) {
    await this.auth.createUserWithEmailAndPassword(email, pw)
    await this.router.navigate(['dashboard'])
  }

  async signIn(email: string, pw: string) {
    await this.auth.signInWithEmailAndPassword(email, pw)
    await this.router.navigate(['dashboard'])
  }

  async signOut() {
    await this.auth.signOut()
    await this.router.navigate([''])
  }
}