import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CrudService } from './services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(readonly crud: CrudService) {}

  toggle!: boolean
  toggleCtrl: FormControl = new FormControl()
  isDark: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  
  ngOnInit() {
   this.isDark.next(localStorage.getItem('isDark') === 'true')
   this.toggleCtrl.setValue(localStorage.getItem('isDark') === 'true')
   this.toggle = localStorage.getItem('isDark') === 'true'
  }

  changeTheme() {
    this.toggle = !this.toggle
    localStorage.setItem('isDark', this.toggle.toString())
    this.isDark.next(this.toggle)
  }
}