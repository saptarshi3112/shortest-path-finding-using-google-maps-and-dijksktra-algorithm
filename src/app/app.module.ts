import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatToolbarModule, MatCardModule } from '@angular/material';


import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyA6H5FqUNrBlPCdkAjaUeQmEbjSfUQdglM"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
