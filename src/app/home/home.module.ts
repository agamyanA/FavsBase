import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './container/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { TuiIslandModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TuiIslandModule
  ]
})
export class HomeModule { }
