import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Folder } from 'src/app/models/folder.model';

@Component({
  selector: 'folder',
  templateUrl: 'folder.component.html',
  styleUrls: ['folder.component.scss']
})

export class FolderComponent {
  
  @Output() remove: EventEmitter<any> = new EventEmitter()
  @Output() edit: EventEmitter<any> = new EventEmitter()
  @Input() card!: AngularFirestoreDocument<Folder>

  menuToggle: boolean = false
  menuOpen: boolean = false

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
