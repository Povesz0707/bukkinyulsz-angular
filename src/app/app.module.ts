import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MainPage} from "./pages/main-page/main.page";
import {AppRoutingModule} from "./app-routing.module";
import {Distance10km} from "./pages/10km-page/distance.10km";

@NgModule({
  declarations: [
    AppComponent,
    MainPage,
    Distance10km
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
