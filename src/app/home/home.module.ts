import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

import { TuiButtonModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule, TuiIslandModule } from '@taiga-ui/kit';


import { HomeComponent } from './container/home.component';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [
    HomeComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TuiIslandModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiButtonModule
  ]
})
export class HomeModule { }
