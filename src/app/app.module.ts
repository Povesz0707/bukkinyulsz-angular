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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {ConfirmDialog} from "./dialogs/confirm-dialog/confirm.dialog";
import {MatSelectModule} from "@angular/material/select";
import {AdminPageDistance} from "./pages/admin-page/admin-page-distances/admin-page-distance/admin.page.distance";
import {MatCardModule} from "@angular/material/card";
import {AdminPageEvent} from "./pages/admin-page/admin-page-event/admin-page-event/admin.page.event";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {
  AdminPageSubSectionList
} from "./pages/admin-page/admin-page-subSection/admin-page-subSection-list/admin.page.subSection.list";
import {
  AdminPageSubSectionDialog
} from "./pages/admin-page/admin-page-subSection/admin-page-subSection-dialog/admin.page.subSection.dialog";
import {
  AdminPageSubSection
} from "./pages/admin-page/admin-page-subSection/admin-page-subSection/admin.page.subSection";
import {
  AdminPageCheckpoint
} from "./pages/admin-page/admin-page-checkpoint/admin-page-checkpoint/admin.page.checkpoint";
import {
  AdminPageCheckpointDialog
} from "./pages/admin-page/admin-page-checkpoint/admin-page-checkpoint-dialog/admin.page.checkpoint.dialog";
import {
  AdminPageCheckpointList
} from "./pages/admin-page/admin-page-checkpoint/admin-page-checkpoint-list/admin.page.checkpoint.list";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {UploaderModule} from "angular-uploader";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {MatRadioModule} from "@angular/material/radio";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ImportantInformationPage} from "./pages/importantInformation-page/importantInformation.page";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";

@NgModule({
  declarations: [
    AppComponent,
    MainPage,
    Distance10km,
    DistanceView,
    ConfirmDialog,
    AdminPageDistance,
    AdminPageDistancesList,
    AdminPageDistanceDialog,
    AdminPageEvent,
    AdminPageEventList,
    AdminPageEventDialog,
    AdminPageSubSection,
    AdminPageSubSectionList,
    AdminPageSubSectionDialog,
    AdminPageCheckpoint,
    AdminPageCheckpointDialog,
    AdminPageCheckpointList,
    AdminPageLogin,
    ImportantInformationPage
  ],
  imports: [
    LeafletModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    UploaderModule,
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
    MatTabsModule,
    MatSelectModule,
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    MatRadioModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule

  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'hu-HU'},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
