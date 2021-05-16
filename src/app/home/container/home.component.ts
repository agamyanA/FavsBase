import { Component } from '@angular/core';
import { IAuth } from 'src/app/models/auth';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})

export class HomeComponent {

  handle(authInfo: IAuth) {
    this.validation = authInfo
  }

  validation: object = {}

  constructor(private vs: ValidationService) {}

  
}