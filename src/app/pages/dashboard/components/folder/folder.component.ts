import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Folder } from 'src/app/pages/dashboard/models/folder.model';

@Component({
  selector: 'folder',
  templateUrl: 'folder.component.html',
  styleUrls: ['folder.component.scss']
})

export class FolderComponent {
  
  @Output() remove: EventEmitter<any> = new EventEmitter()
  @Output() edit: EventEmitter<any> = new EventEmitter()
  @Output() open: EventEmitter<any> = new EventEmitter()
  @Input() folder!: Folder

  menuToggle: boolean = false
  menuOpen: boolean = false

  showMenuToggle() {
    this.menuToggle = !this.menuToggle
  }

  openMenuToggle(event: Event) {
    event.stopPropagation()
    this.menuOpen =! this.menuOpen
  }

  editFolder() {
    this.edit.emit()
  }

  removeFolder() {
    this.remove.emit()
  }

  openFolder() {
    this.open.emit(this.folder.name)
  }
}