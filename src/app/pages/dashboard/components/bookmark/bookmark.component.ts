import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bookmark } from 'src/app/pages/dashboard/models/bookmark.model';

@Component({
  selector: 'bookmark',
  templateUrl: 'bookmark.component.html',
  styleUrls: ['bookmark.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BookmarkComponent implements OnInit {

  @Output() remove: EventEmitter<any> = new EventEmitter()
  @Output() edit: EventEmitter<any> = new EventEmitter()
  @Input() bookmark!: Bookmark

  menuToggle: boolean = false
  menuOpen: boolean = false
  avatarURL: string = ''

  ngOnInit() {
    const bookmarkURL = new URL(this.bookmark.url)
    this.avatarURL = `https://api.faviconkit.com/${bookmarkURL.hostname}/32`
  }

  showMenuToggle() {
    this.menuToggle = !this.menuToggle
  }

  openMenuToggle(event: Event) {
    event.preventDefault()
    this.menuOpen =! this.menuOpen
  }

  editBookmark() {
    this.edit.emit(this.bookmark)
  }

  removeBookmark() {
    this.remove.emit(this.bookmark.id)
  }
}