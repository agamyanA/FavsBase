import { environment } from '../environments/environment'

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { ReactiveFormsModule } from '@angular/forms';
import { TuiRootModule, TuiThemeNightModule } from '@taiga-ui/core';
import { TuiToggleModule } from '@taiga-ui/kit';

import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    DashboardModule,
    TuiRootModule,
    TuiThemeNightModule,
    TuiToggleModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }