import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Bookmark } from 'src/app/models/bookmark.model';
import { dialogType } from 'src/app/models/dialogType.model';
import { Folder } from 'src/app/models/folder.model';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'item-dialog',
  templateUrl: 'item-dialog.component.html',
  styleUrls: ['item-dialog.component.scss']
})

export class ItemDialogComponent implements OnInit {

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, dialogType>,
    private fb: FormBuilder,
    private crud: CrudService,
    private auth: AuthService
  ) {}

  dialogType!: dialogType
  formFieldLabels: string[] = ['Name', 'URL']

  addItemForm: FormGroup = this.fb.group({
    formFields: this.fb.array([
      this.fb.control('', Validators.required)
    ])
  })

  get formFields(): FormArray {
    return this.addItemForm.get('formFields') as FormArray
  }
 
  ngOnInit() {
    this.dialogType = this.context.data

    if (this.dialogType.type === 'Bookmark') {
      this.formFields.push(this.fb.control('', Validators.required))
    }
  }

  createBookmark(...value: string[]): Bookmark {
    const [title, url] = value
    
    return {
      title: title,
      url: url
    }
  }

  createFolder(...value: string[]): Folder {
    const [name] = value

    return {
      name: name
    }
  }

  addItem() {
    switch (this.dialogType.type) {
      case 'Bookmark':
        this.crud.addBookmark(
          this.auth.userID.getValue(),
          this.createBookmark(...this.formFields.value),
          'main'
        )
        break
      case 'Folder':
        this.crud.addFolder(
          this.auth.userID.getValue(),
          this.createFolder(...this.formFields.value),
          'main'
        )
        break
    }

    this.context.$implicit.complete()
  }
}