import { Component } from '@angular/core';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'app-board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.scss']
})

export class BoardComponent {

  data: Card[] = [
    {
      title: 'RxJS',
      url: 'rxjs.dev'
    },
    {
      title: 'Angular',
      url: 'angular.io'
    },
    {
      title: 'GitHub',
      url: 'github.com'
    },
    {
      title: 'VK',
      url: 'vk.com'
    }
  ]

  remove() {
    this.data.pop() 
  }
}