import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router) {}

  authError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  userID: BehaviorSubject<any> = new BehaviorSubject<any>('')

  getUserID() {
    this.auth.user.pipe(take(1)).subscribe(
      user => {
        this.userID.next(user?.uid)
        localStorage.setItem('uid', this.userID.getValue())
      }
    )
  }

  signUp(email: string, pw: string): Observable<any> {
    this.getUserID()
    return from(this.auth.createUserWithEmailAndPassword(email, pw))
  }

  signIn(email: string, pw: string): Observable<any> {
    this.getUserID()
    return from(this.auth.signInWithEmailAndPassword(email, pw))
  }

  signInDemo(): Observable<any> {
    this.getUserID()
    return from(this.auth.signInAnonymously())
  }

  signOut(): Observable<any> {
    this.userID.next(null)
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