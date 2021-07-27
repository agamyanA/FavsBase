import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { dialogData } from 'src/app/pages/dashboard/models/dialogData.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'item-dialog',
  templateUrl: 'item-dialog.component.html',
  styleUrls: ['item-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ItemDialogComponent implements OnInit {

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, dialogData>,
    private fb: FormBuilder,
    private crud: CrudService,
  ) {}

  dialogData: dialogData = this.context.data
  formFieldLabels: string[] = ['Name', 'URL']
  VALID_URL: RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

  addItemForm: FormGroup = this.fb.group({
    formFields: this.fb.array([
      this.fb.control(this.dialogData.itemDetails.title, Validators.required)
    ])
  })

  get formFields(): FormArray {
    return this.addItemForm.get('formFields') as FormArray
  }

  get isValidURL(): boolean {
    return this.addItemForm.get('formFields')?.get([1])?.errors?.pattern
  }
 
  ngOnInit() {
    if (this.dialogData.itemDetails.type === 'Bookmark') {
      this.formFields.push(
        this.fb.control(this.dialogData.itemDetails.url, [Validators.required, Validators.pattern(this.VALID_URL)])
      )
    }
  }

  editDialogSubmit() {
    switch (this.dialogData.itemDetails.type) {
      case 'Bookmark':
        this.crud.editBookmark(this.dialogData.itemDetails.id, this.formFields.value)
        break
      case 'Folder':
        this.crud.editFolder(this.dialogData.itemDetails.id, this.formFields.value)
        break
    }
  }

  addDialogSubmit() {
    switch (this.dialogData.itemDetails.type) {
      case 'Bookmark':
        this.crud.addBookmark(this.formFields.value)
        break
      case 'Folder':
        this.crud.addFolder(this.formFields.value)
        break
    }
  }

  submitDialog() {
    switch (this.dialogData.action) {
      case 'Add':
        this.addDialogSubmit()
        break
      case 'Edit':
        this.editDialogSubmit()
        break
    }
    this.context.$implicit.complete()
  }
}