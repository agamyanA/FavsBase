import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.scss' ]
})

export class AppComponent {

  toggle: FormControl = new FormControl()
  isDark: Observable<Boolean> = this.toggle.valueChanges
}