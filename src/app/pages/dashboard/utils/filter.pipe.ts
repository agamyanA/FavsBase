import { Pipe, PipeTransform } from '@angular/core';
import { Bookmark } from '../models/bookmark.model';
import { Folder } from '../models/folder.model';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform(items: (Folder | Bookmark)[] | null, searchText: string): any[] {
    if (!items) {
      return []
    }
    
    if (!searchText) {
      return items
    }

    searchText = searchText.toLocaleLowerCase()
    
    return items.filter((item: Folder | Bookmark) => {
      return item.title.toLocaleLowerCase().includes(searchText)
    })
  }
}