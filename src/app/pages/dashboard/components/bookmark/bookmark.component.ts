import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bookmark } from 'src/app/models/bookmark.model';

@Component({
  selector: 'bookmark',
  templateUrl: 'bookmark.component.html',
  styleUrls: ['bookmark.component.scss']
})

export class BookmarkComponent {

  @Output() remove: EventEmitter<any> = new EventEmitter()
  @Output() edit: EventEmitter<any> = new EventEmitter()
  @Input() card!: Bookmark

  menuToggle: boolean = false
  menuOpen: boolean = false
  avatarUrl: string = 'https://api.faviconkit.com/'

  showMenuToggle() {
    this.menuToggle = !this.menuToggle
  }

  openMenuToggle(event: Event) {
    event.preventDefault()
    this.menuOpen =! this.menuOpen
  }

  editCard() {
    this.edit.emit()
  }

  removeCard() {
    this.remove.emit()
  }
}