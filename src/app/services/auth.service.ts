import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router) {}

  authError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  user: Observable<any> = this.auth.user

  signUp(email: string, pw: string): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(email, pw))
  }

  signIn(email: string, pw: string): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(email, pw))
  }

  signInDemo(): Observable<any> {
    return from(this.auth.signInAnonymously())
  }

  signOut(): Observable<any> {
    return from(this.auth.signOut()) 
  }

  handler(mode: Observable<any>, notifier: Subject<any>) {

    const method = mode.pipe(
          takeUntil(notifier)
        )

    method.subscribe(
      () => {
        this.authError.next(false)
        this.router.navigate(['dashboard'])
      },
      () => this.authError.next(true)
    )
  }
}