import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bookmark } from '../pages/dashboard/models/bookmark.model';
import { Folder } from '../pages/dashboard/models/folder.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  constructor(private db: AngularFirestore, private auth: AuthService) {}

  currentFolder: BehaviorSubject<string> = new BehaviorSubject<string>('main')

  private get UserData(): AngularFirestoreDocument {
    return this.db.collection('users').doc(this.auth.userID.getValue())
  }

  addBookmark(details: string[]) {
    const [title, url] = details

    this.UserData.collection(this.currentFolder.getValue()).add({
      title: title,
      url: url,
      type: 'bookmark'
    })
  }

  addFolder(details: string[]) {
    const [title] = details

    this.UserData.collection(this.currentFolder.getValue()).add({
      title: title,
      type: 'folder'
    })

    this.UserData.collection(title).add({})
  }

  getBookmarks(): Observable<Bookmark[]> {
    return this.UserData.collection(this.currentFolder.getValue(), ref => {
      return ref.where('type', '==', 'bookmark')
    }).valueChanges() as Observable<Bookmark[]>
  }

  getFolders(): Observable<Folder[]> {
    return this.UserData.collection(this.currentFolder.getValue(), ref => {
      return ref.where('type', '==', 'folder')
    }).valueChanges() as Observable<Folder[]>
  }
}