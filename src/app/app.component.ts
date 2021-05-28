import { AfterContentChecked, ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements AfterContentChecked {

  constructor() {
    this.toggle.valueChanges.subscribe(val => localStorage.setItem('isDark', val))
  }

  toggle: FormControl = new FormControl()
  isDark: Observable<boolean> = this.toggle.valueChanges

  ngAfterContentChecked() {
    this.toggle.setValue(localStorage.getItem('isDark') === 'true')
  }
}