import { Component, Inject } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent, POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { dialogData } from 'src/app/pages/dashboard/models/dialogData.model';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';

@Component({
  selector: 'choose-item-dialog',
  templateUrl: 'choose-item-dialog.component.html',
  styleUrls: ['choose-item-dialog.component.scss']
})

export class ChooseItemDialogComponent {

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<dialogData, void>,
    private dialogService: TuiDialogService
  ) {}

  openBookmarkDialog() {
    this.dialogService.open(
      new PolymorpheusComponent(ItemDialogComponent), {
        size: 's',
        data: {
          action: 'Add',
          itemDetails: {
            type: 'Bookmark'
          }
        }
      }
    ).subscribe()

    this.context.$implicit.complete()
  }

  openFolderDialog() {
    this.dialogService.open(
      new PolymorpheusComponent(ItemDialogComponent), {
        size: 's',
        data: {
          action: 'Add',
          itemDetails: {
            type: 'Folder'
          }
        }
      }
    ).subscribe()

    this.context.$implicit.complete()
  }
}