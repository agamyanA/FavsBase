import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { dialogType } from 'src/app/models/dialogType.model';

@Component({
  selector: 'item-dialog',
  templateUrl: 'item-dialog.component.html',
  styleUrls: ['item-dialog.component.scss']
})

export class ItemDialogComponent implements OnInit {

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, dialogType>,
    private fb: FormBuilder
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

  addItem() {
    this.context.$implicit.complete()
  }
}