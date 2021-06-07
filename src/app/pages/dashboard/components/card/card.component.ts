import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss']
})

export class CardComponent implements OnInit {

  @Output() remove: EventEmitter<any> = new EventEmitter()
  @Input() card!: Card

  menuToggle: boolean = false
  menuOpen: boolean = false
  title: string = ''
  avatarUrl: string = ''
  url: string = ''

  ngOnInit() {
    this.title = this.card.title
    this.avatarUrl = `https://api.faviconkit.com/${this.card.url}/32`
    this.url = `https://${this.card.url}`
  }

  showMenuToggle() {
    this.menuToggle = !this.menuToggle
  }

  openMenuToggle(event: Event) {
    event.preventDefault()
    this.menuOpen =! this.menuOpen
  }

  editCard() {
    console.log('edit');
  }

  removeCard() {
    this.remove.emit()
  }
}