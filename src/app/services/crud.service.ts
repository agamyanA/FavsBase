import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Bookmark } from '../models/bookmark.model';
import { Folder } from '../models/folder.model';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  constructor(private db: AngularFirestore) {}

  addBookmark(uid: string, bookmark: Bookmark, parentName: string) {        
    this.db.collection('users').doc(uid).collection(parentName).add({...bookmark, type: 'bookmark'})
  }

  addFolder(uid: string, folder: Folder, parentName: string) {
    this.db.collection('users').doc(uid).collection(parentName).add({...folder, type: 'folder'})
    this.db.collection('users').doc(uid).collection(folder.name).add({})
  }

  getBookmarks(uid: string, folder: Folder): Observable<Bookmark[]> {
    return this.db.collection('users').doc(uid).collection(folder.name, ref => {
      return ref.where('type', '==', 'bookmark')
    }).valueChanges() as Observable<Bookmark[]>
  }

  getFolders(uid: string, folder: Folder): Observable<Folder[]> {
    return this.db.collection('users').doc(uid).collection(folder.name, ref => {
      return ref.where('type', '==', 'folder')
    }).valueChanges() as Observable<Folder[]>
  }
}