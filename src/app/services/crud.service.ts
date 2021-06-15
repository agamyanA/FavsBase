import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Bookmark } from '../pages/dashboard/models/bookmark.model';
import { Folder } from '../pages/dashboard/models/folder.model';
import { AuthService } from './auth.service';
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  constructor(private db: AngularFirestore, private auth: AuthService) {}

  currentFolder: BehaviorSubject<string> = new BehaviorSubject<string>('')

  private get UserData(): AngularFirestoreDocument {
    return this.db.collection('users').doc(this.auth.userID.getValue())
  }

  get totalItems(): Observable<any[]> {
    return combineLatest([this.getBookmarks(), this.getFolders()])
  }

  addBookmark(details: string[]) {
    let [title, url] = details
    const id = uuidv4()
    
    if (url.includes('https://')) {
      url = url.slice(8)
    }

    this.UserData.collection(this.currentFolder.getValue()).doc(id).set({
      title: title,
      url: url,
      type: 'Bookmark',
      id: id
    })
  }

  addFolder(details: string[]) {
    const [title] = details
    const id = uuidv4()

    this.UserData.collection(this.currentFolder.getValue()).doc(id).set({
        title: title,
        type: 'Folder',
        id: id
    })
    this.UserData.collection(id).add({})
  }

  getBookmarks(): Observable<Bookmark[]> {
    return this.UserData.collection(this.currentFolder.getValue(), ref => {
      return ref.where('type', '==', 'Bookmark')
    }).valueChanges() as Observable<Bookmark[]>
  }

  getFolders(): Observable<Folder[]> {
    return this.UserData.collection(this.currentFolder.getValue(), ref => {
      return ref.where('type', '==', 'Folder')
    }).valueChanges() as Observable<Folder[]>
  }

  editBookmark(id: string, details: string[]) {
    const [title, url] = details

    this.UserData.collection(this.currentFolder.getValue()).doc(id).update({
      title: title,
      url: url
    })
  }

  editFolder(id: string, details: string[]) {
    const [title] = details    

    this.UserData.collection(this.currentFolder.getValue()).doc(id).update({
      title: title
    })
  }

  removeItem(id: string) {
    this.UserData.collection(this.currentFolder.getValue()).doc(id).delete()
  }
}