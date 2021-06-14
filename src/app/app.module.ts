import { environment } from '../environments/environment'

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { HomeModule } from './pages/home/home.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';

import { TuiRootModule, TuiThemeNightModule } from '@taiga-ui/core';
import { TuiToggleModule } from '@taiga-ui/kit';

import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pages/404/page-not-found.component';

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
  declarations: [AppComponent, PageNotFoundComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }