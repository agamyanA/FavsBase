import { Component, OnInit } from '@angular/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus'
import { TuiDialogService } from '@taiga-ui/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChooseItemDialogComponent } from '../components/choose-item-dialog/choose-item-dialog.component';
import { Observable } from 'rxjs';
import { Bookmark } from 'src/app/pages/dashboard/models/bookmark.model';
import { Folder } from 'src/app/pages/dashboard/models/folder.model';
import { CrudService } from 'src/app/services/crud.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ItemDialogComponent } from '../components/item-dialog/item-dialog.component';

@Component({
  selector: 'dashboard',
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
  totalItems!: Observable<any[]>
  search: FormControl = new FormControl()
  searchText: Observable<any> = this.search.valueChanges

  ngOnInit() {
    this.auth.currentUser.pipe(take(1)).subscribe(
      user => {
        this.auth.userID.next(user?.uid)
        this.openFolder('main')
      }
    )
  }
  
  goToMain() {
    this.openFolder('main')
  }

  openDialog() {
    this.dialogService.open(
      new PolymorpheusComponent(ChooseItemDialogComponent), {
        size: 's'
      }
    ).subscribe()
  }

  openFolder(id: string) {
    this.crud.currentFolder.next(id)
    this.bookmarks = this.crud.getBookmarks()
    this.folders = this.crud.getFolders()
    this.totalItems = this.crud.totalItems
  }

  editBookmark(bookmark: Bookmark) {
    this.dialogService.open(
      new PolymorpheusComponent(ItemDialogComponent), {
        size: 's',
        data: {
          action: 'Edit',
          itemDetails: {
            id: bookmark.id,
            type: bookmark.type,
            title: bookmark.title,
            url: bookmark.url
          }
        }
      }
    ).subscribe()
  }

  editFolder(folder: Folder) {
    this.dialogService.open(
      new PolymorpheusComponent(ItemDialogComponent), {
        size: 's',
        data: {
          action: 'Edit',
          itemDetails: {
            id: folder.id,
            type: folder.type,
            title: folder.title
          }
        }
      }
    ).subscribe()
  }
  
  removeItem(id: string) {
    this.crud.removeItem(id)
  }

  signOut() {
    this.auth.signOut()
    this.router.navigate([''])
  }

  trackBy(index: number, item: any) {
    return item.id
  }
}