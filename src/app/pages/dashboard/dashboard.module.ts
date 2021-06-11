import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './container/dashboard.component';
import { SearchComponent } from './components/search/search.component';
import { BoardComponent } from './components/board/board.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { ChooseItemDialogComponent } from './components/choose-item-dialog/choose-item-dialog.component';
import { ItemDialogComponent } from './components/item-dialog/item-dialog.component';

import { TuiAvatarModule, TuiInputModule, TuiIslandModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiDialogModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';

@NgModule({
  declarations: [
    DashboardComponent,
    SearchComponent,
    BoardComponent,
    BookmarkComponent,
    ChooseItemDialogComponent,
    ItemDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiIslandModule,
    TuiButtonModule,
    TuiAvatarModule,
    TuiSvgModule,
    TuiDialogModule,
    TuiTextfieldControllerModule
  ]
})
export class DashboardModule { }