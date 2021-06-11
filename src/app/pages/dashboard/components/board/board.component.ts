import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bookmark } from 'src/app/models/bookmark.model';
import { Folder } from 'src/app/models/folder.model';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.scss']
})

export class BoardComponent implements OnInit {

  constructor(private crud: CrudService, private auth: AuthService) {}

  bookmarks!: Observable<Bookmark[]>
  folders!: Observable<Folder[]>

  ngOnInit() {
    this.bookmarks = this.crud.getBookmarks(this.auth.userID.getValue(), {name: 'main'})
    this.folders = this.crud.getFolders(this.auth.userID.getValue(), {name: 'main'})
  }

  edit() {
    
  }

  remove() {

  }
}