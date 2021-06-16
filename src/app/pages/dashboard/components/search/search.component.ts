import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchComponent {

  @Input() search!: FormControl
}