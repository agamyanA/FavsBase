import { environment } from '../environments/environment.prod'

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { TuiDialogModule, TuiRootModule, TuiThemeNightModule } from '@taiga-ui/core';
import { TuiToggleModule } from '@taiga-ui/kit';

import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TuiRootModule,
    TuiThemeNightModule,
    TuiDialogModule,
    TuiToggleModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }