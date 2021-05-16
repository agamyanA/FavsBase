import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule, TuiIslandModule } from '@taiga-ui/kit';

import { HomeComponent } from './container/home.component';
import { AuthComponent } from './components/auth/auth.component';

import { ValidationService } from './services/validation.service';

@NgModule({
  declarations: [
    HomeComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    TuiIslandModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiButtonModule,
    TuiErrorModule
  ],
  providers: [ValidationService]
})
export class HomeModule { }
