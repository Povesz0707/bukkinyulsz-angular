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
import {AdminPageLogin} from "./pages/admin-page/admin-page-login/admin.page.login";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {
  AdminPageDistancesList
} from "./pages/admin-page/admin-page-distances/admin-page-distance-list/admin.page.distances.list";
import {
  AdminPageDistanceDialog
} from "./pages/admin-page/admin-page-distances/admin-page-distance-dialog/admin.page.distance.dialog";
import {MatTabsModule} from "@angular/material/tabs";
import {
  AdminPageEventDialog
} from "./pages/admin-page/admin-page-event/admin-page-event-dialog/admin.page.event.dialog";
import {AdminPageEventList} from "./pages/admin-page/admin-page-event/admin-page-event-list/admin.page.event.list";

@NgModule({
  declarations: [
    AppComponent,
    MainPage,
    Distance10km,
    DistanceView,
    AdminPageDistancesList,
    AdminPageDistanceDialog,
    AdminPageEventList,
    AdminPageEventDialog,
    AdminPageLogin
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
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatTabsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
