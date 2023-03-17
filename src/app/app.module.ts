import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MainPage} from "./pages/main-page/main.page";
import {AppRoutingModule} from "./app-routing.module";
import {Distance10km} from "./pages/distances/10km-page/distance.10km";
import {HttpClientModule} from "@angular/common/http";
import {DistanceView} from "./pages/distances/distance-view/distance.view";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    MainPage,
    Distance10km,
    DistanceView
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatInputModule,
        FormsModule,
        MatGridListModule,
        MatTooltipModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
