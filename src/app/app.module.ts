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
import {CarouselModule} from "@coreui/angular";
import {} from "@coreui/icons-angular";
import {ResultPage} from "./pages/result-page/result.page";
import {RegistrationPage} from "./pages/registration-page/registration.page";
import {MatStepperModule} from "@angular/material/stepper";
import {MatExpansionModule} from "@angular/material/expansion";

import {NgxMaskModule} from 'ngx-mask';
import {
  AdminPageSponsorList
} from "./pages/admin-page/admin-page-sponsor/admin-page-sponsor-list/admin.page.sponsor.list";
import {
  AdminPageSponsorDialog
} from "./pages/admin-page/admin-page-sponsor/admin-page-sponsor-dialog/admin.page.sponsor.dialog";
import {AdminPageSponsor} from "./pages/admin-page/admin-page-sponsor/admin-page-sponsor/admin.page.sponsor";
import {AdminPageTender} from "./pages/admin-page/admin-page-tender/admin-page-tender/admin.page.tender";
import {
  AdminPageTenderDialog
} from "./pages/admin-page/admin-page-tender/admin-page-tender-dialog/admin.page.tender.dialog";
import {AdminPageTenderList} from "./pages/admin-page/admin-page-tender/admin-page-tender-list/admin.page.tender.list";
import { AdminPageNews } from './pages/admin-page/admin-page-news/admin-page-news/admin.page.news';
import { AdminPageNewsDialog } from './pages/admin-page/admin-page-news/admin-page-news-dialog/admin.page.news.dialog';
import { AdminPageNewsList } from './pages/admin-page/admin-page-news/admin-page-news-list/admin.page.news.list';
import {NewsPage} from "./pages/news/news.page";
import {NewsPagePage} from "./pages/news-page/news-page.page";
import {AdminPageImageGalery} from "./pages/admin-page/admin-page-imageGalery/admin-page-tender/admin.page.imageGalery";
import {
  AdminPageImageGaleryList
} from "./pages/admin-page/admin-page-imageGalery/admin-page-tender-list/admin.page.imageGalery.list";
import {
  AdminPageImageGaleryDialog
} from "./pages/admin-page/admin-page-imageGalery/admin-page-tender-dialog/admin-page-image-galery-dialog.component";
import {GaleryPage} from "./pages/galery-page/galery.page";

// @ts-ignore
@NgModule({
  declarations: [
    RegistrationPage,
    AppComponent,
    MainPage,
    ResultPage,
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
    ImportantInformationPage,
    AdminPageSponsor,
    AdminPageSponsorList,
    AdminPageSponsorDialog,
    AdminPageTender,
    AdminPageTenderDialog,
    AdminPageTenderList,
    AdminPageNews,
    AdminPageNewsDialog,
    AdminPageNewsList,
    AdminPageImageGalery,
    AdminPageImageGaleryDialog,
    AdminPageImageGaleryList,
    NewsPage,
    NewsPagePage,
    GaleryPage,

  ],
  imports: [
    NgxMaskModule.forRoot(),
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
    ReactiveFormsModule,
    CarouselModule,
    MatStepperModule,
    MatExpansionModule,
    NgxMaskModule,

  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'hu-HU'},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
