import { Component, OnInit } from '@angular/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus'
import { TuiDialogService } from '@taiga-ui/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChooseItemDialogComponent } from '../components/choose-item-dialog/choose-item-dialog.component';
import { Observable } from 'rxjs';
import { Bookmark } from 'src/app/models/bookmark.model';
import { Folder } from 'src/app/models/folder.model';
import { CrudService } from 'src/app/services/crud.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html', 
  styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  constructor(
    private dialogService: TuiDialogService,
    private auth: AuthService,
    private crud: CrudService,
    private router: Router
  ) {}

  bookmarks!: Observable<Bookmark[]>
  folders!: Observable<Folder[]>
  isLoaded: boolean = false

  ngOnInit() {
    this.auth.currentUser.pipe(take(1)).subscribe(
      user => {
        this.auth.userID.next(user?.uid)
        this.bookmarks = this.crud.getBookmarks()
        this.folders = this.crud.getFolders()
        this.isLoaded = true
      }
    )
  }

  openDialog() {
    this.dialogService.open(
      new PolymorpheusComponent(ChooseItemDialogComponent), {
        size: 's'
      }
    ).subscribe()
  }

  openFolder(folderName: string) {
    this.crud.currentFolder.next(folderName)
    this.bookmarks = this.crud.getBookmarks()
    this.folders = this.crud.getFolders()
  }

  edit() {}
  
  remove() {}

  goToMain() {
    this.crud.currentFolder.next('main')
    this.bookmarks = this.crud.getBookmarks()
    this.folders = this.crud.getFolders()
  }

  signOut() {
    this.auth.signOut()
    this.router.navigate(['home'])
  }
}