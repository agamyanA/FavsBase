import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './container/dashboard.component';
import { SearchComponent } from './components/search/search.component';
import { BoardComponent } from './components/board/board.component';
import { CardComponent } from './components/card/card.component';

import { TuiActionModule, TuiInputModule, TuiIslandModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiDataListModule } from '@taiga-ui/core';

@NgModule({
  declarations: [
    DashboardComponent,
    SearchComponent,
    BoardComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TuiInputModule,
    TuiIslandModule,
    TuiButtonModule,
    TuiActionModule,
    TuiDataListModule
  ]
})
export class DashboardModule { }